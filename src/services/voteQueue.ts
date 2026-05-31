import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api';
import NetInfo from '@react-native-community/netinfo';

const QUEUE_KEY = 'vote_queue';

interface QueuedVote {
  campaignId: string;
  nomineeId: string;
  idempotencyKey: string;
}

class VoteQueue {
  private queue: QueuedVote[] = [];

  async load() {
    const stored = await AsyncStorage.getItem(QUEUE_KEY);
    if (stored) this.queue = JSON.parse(stored);
    this.startSync();
  }

  async add(vote: QueuedVote) {
    this.queue.push(vote);
    await this.persist();
    this.processQueue();
  }

  private async persist() {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(this.queue));
  }

  private async processQueue() {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) return;

    let processed = 0;
    for (const vote of this.queue) {
      try {
        await apiClient.post('/vote', vote, {
          headers: { 'Idempotency-Key': vote.idempotencyKey },
        });
        processed++;
      } catch (error) {
        console.error('Failed to process queued vote', error);
        break;
      }
    }
    if (processed > 0) {
      this.queue = this.queue.slice(processed);
      await this.persist();
    }
  }

  private startSync() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) this.processQueue();
    });
  }
}

export const voteQueue = new VoteQueue();
voteQueue.load(); // auto-start
