export interface User {
  id: string;
  email: string;
  role: 'voter' | 'organizer' | 'admin';
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ACTIVE' | 'PAUSED' | 'CLOSED';
  startAt: string;
  endAt: string;
}

export interface Nominee {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  voteCount?: number;
}

export interface WalletTransaction {
  id: string;
  type: 'FUNDING' | 'VOTE_DEDUCTION' | 'REVERSAL' | 'ADMIN_ADJUSTMENT';
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}
