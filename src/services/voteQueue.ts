import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api';
import NetInfo from '@react-native-community/netinfo';
import { generateIdempotencyKey } from '../utils/idempotency';

const QUEUE_KEY = 'vote_queue';

interface QueuedVote {
  campaignId: string;
  nomineeId: string;
  idempotencyKey: string;
  retries: number;
}

class VoteQueue {
  private queue: QueuedVote[] = [];
  private isSyncing = false;

  async load() {
    const stored = await AsyncStorage.getItem(QUEUE_KEY);
    if (stored) this.queue = JSON.parse(stored);
    this.startSync();
  }

  async add(vote: Omit<QueuedVote, 'retries'>) {
    this.queue.push({ ...vote, retries: 0 });
    await this.persist();
    this.processQueue();
  }

  private async persist() {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(this.queue));
  }

  private async processQueue() {
    if (this.isSyncing) return;
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) return;

    this.isSyncing = true;
    let processed = 0;
    for (const vote of this.queue) {
      try {
        await apiClient.post('/vote', vote, {
          headers: { 'Idempotency-Key': vote.idempotencyKey }
        });
        processed++;
      } catch (error: any) {
        if (vote.retries < 3 && error.response?.status !== 401) {
          vote.retries++;
        } else {
          processed++; // drop after 3 retries or auth error
        }
        break;
      }
    }
    if (processed > 0) {
      this.queue = this.queue.slice(processed);
      await this.persist();
    }
    this.isSyncing = false;
  }

  private startSync() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) this.processQueue();
    });
    setInterval(() => this.processQueue(), 30000); // retry every 30s
  }
}

export const voteQueue = new VoteQueue();
voteQueue.load();
