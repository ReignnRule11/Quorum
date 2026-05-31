import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useVoting } from '../../hooks/useVoting';
import { useWallet } from '../../hooks/useWallet';

type VoteScreenRouteProp = RouteProp<RootStackParamList, 'Vote'>;

export default function VoteScreen() {
  const route = useRoute<VoteScreenRouteProp>();
  const navigation = useNavigation();
  const { campaignId, nomineeId, nomineeName } = route.params;
  const { castVote, loading } = useVoting();
  const { balance, refreshBalance } = useWallet();
  const [submitting, setSubmitting] = useState(false);

  const handleConfirmVote = async () => {
    if (balance < 1) {
      Alert.alert('Insufficient Balance', 'Please fund your wallet first.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Fund Wallet', onPress: () => navigation.navigate('FundWallet' as never) },
      ]);
      return;
    }
    setSubmitting(true);
    try {
      await castVote(campaignId, nomineeId);
      await refreshBalance();
      Alert.alert('Success', `Vote cast for ${nomineeName}`);
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Vote Failed', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Vote</Text>
      <Text style={styles.nominee}>Nominee: {nomineeName}</Text>
      <Text style={styles.cost}>Cost: 1 coin</Text>
      <Text style={styles.balance}>Your balance: {balance} coins</Text>
      {submitting || loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Confirm Vote" onPress={handleConfirmVote} color="#d32f2f" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  nominee: { fontSize: 20, marginBottom: 10, textAlign: 'center' },
  cost: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  balance: { fontSize: 16, marginBottom: 30, textAlign: 'center', fontWeight: '600' },
});
