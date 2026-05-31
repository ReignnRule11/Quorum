import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { apiClient } from '../../services/api';
import { useWallet } from '../../hooks/useWallet';

const PACKAGES = [
  { coins: 10, price: 0.10 },
  { coins: 50, price: 0.50 },
  { coins: 100, price: 1.00 },
  { coins: 500, price: 5.00 },
];

export default function FundWalletScreen() {
  const [loading, setLoading] = useState(false);
  const { refreshBalance } = useWallet();

  const handlePurchase = async (coins: number) => {
    setLoading(true);
    try {
      // Mock payment: call backend to credit wallet (in MVP, backend handles mock webhook)
      const res = await apiClient.post('/payments/mock', { coins });
      if (res.data.success) {
        await refreshBalance();
        Alert.alert('Success', `${coins} coins added to your wallet.`);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Funding Package</Text>
      {PACKAGES.map((pkg) => (
        <TouchableOpacity key={pkg.coins} style={styles.card} onPress={() => handlePurchase(pkg.coins)} disabled={loading}>
          <Text style={styles.coins}>{pkg.coins} coins</Text>
          <Text style={styles.price}>${pkg.price.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f0f0f0', padding: 20, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  coins: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 16, color: '#0a7ea4' },
});
