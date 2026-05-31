import React, { createContext, useState, ReactNode } from 'react';
import { voteQueue } from '../services/voteQueue';
import { apiClient } from '../services/api';
import { generateIdempotencyKey } from '../utils/idempotency';

interface VotingContextType {
  castVote: (campaignId: string, nomineeId: string) => Promise<void>;
  loading: boolean;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const castVote = async (campaignId: string, nomineeId: string) => {
    setLoading(true);
    const idempotencyKey = generateIdempotencyKey();
    try {
      await apiClient.post(
        '/vote',
        { campaignId, nomineeId },
        { headers: { 'Idempotency-Key': idempotencyKey } }
      );
    } catch (error: any) {
      // If network error, queue for later
      if (error.message === 'Network Error') {
        await voteQueue.add({ campaignId, nomineeId, idempotencyKey });
        throw new Error('Vote queued for when you are back online');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return <VotingContext.Provider value={{ castVote, loading }}>{children}</VotingContext.Provider>;
};

export { VotingContext };
