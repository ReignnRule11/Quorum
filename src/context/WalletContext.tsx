import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { apiClient } from '../services/api';

interface WalletContextType {
  balance: number;
  transactions: any[];
  loading: boolean;
  refreshBalance: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshBalance = useCallback(async () => {
    try {
      const res = await apiClient.get('/wallet/balance');
      setBalance(res.data.balance);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const refreshTransactions = useCallback(async () => {
    try {
      const res = await apiClient.get('/wallet/history');
      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ balance, transactions, loading, refreshBalance, refreshTransactions }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext };
