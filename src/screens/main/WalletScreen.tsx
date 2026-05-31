import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useWallet } from '../../hooks/useWallet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type WalletScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function WalletScreen() {
  const { balance, transactions, refreshBalance, loading } = useWallet();
  const navigation = useNavigation<WalletScreenNavProp>();

  React.useEffect(() => {
    refreshBalance();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>{balance} coins</Text>
        <Button title="Fund Wallet" onPress={() => navigation.navigate('FundWallet')} color="#0a7ea4" />
        <Button title="Transaction History" onPress={() => navigation.navigate('TransactionHistory')} color="gray" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  balanceCard: { backgroundColor: 'white', margin: 16, padding: 24, borderRadius: 16, alignItems: 'center', elevation: 2 },
  balanceLabel: { fontSize: 16, color: '#666' },
  balanceValue: { fontSize: 48, fontWeight: 'bold', marginVertical: 16 },
});
