import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { apiClient } from '../../services/api';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await apiClient.get('/wallet/history');
      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.row}>
      <View style={{ flex: 2 }}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text style={[styles.amount, item.amount > 0 ? styles.positive : styles.negative]}>
          {item.amount > 0 ? '+' : ''}{item.amount}
        </Text>
        <Text style={styles.balance}>Balance: {item.balanceAfter}</Text>
      </View>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <FlatList data={transactions} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  row: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent: 'space-between' },
  type: { fontWeight: '600' },
  date: { fontSize: 12, color: '#888', marginTop: 4 },
  amount: { fontWeight: 'bold', fontSize: 16 },
  positive: { color: 'green' },
  negative: { color: 'red' },
  balance: { fontSize: 12, color: '#555', marginTop: 4 },
});
