import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { apiClient } from '../../services/api';
import { useWallet } from '../../hooks/useWallet';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type CardPaymentRouteProp = RouteProp<RootStackParamList, 'CardPayment'>;

export default function CardPaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { refreshBalance } = useWallet();
  const route = useRoute<CardPaymentRouteProp>();
  const navigation = useNavigation();
  const { coins } = route.params;

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Request payment intent from backend
      const { data } = await apiClient.post('/payments/stripe/create-intent', {
        coins,
        currency: 'usd',
      });
      const { clientSecret, paymentIntentId } = data;

      // 2. Initialise payment sheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'QUORUM',
      });
      if (initError) throw new Error(initError.message);

      // 3. Present payment sheet
      const { error: presentError } = await presentPaymentSheet();
      if (presentError) throw new Error(presentError.message);

      // 4. Confirm with backend
      await apiClient.post('/payments/stripe/confirm', { paymentIntentId });
      await refreshBalance();
      Alert.alert('Success', `${coins} coins added!`);
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Payment Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay {coins} coins</Text>
      <Text style={styles.amount}>${(coins / 100).toFixed(2)}</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Pay with Card" onPress={handlePayment} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  amount: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
});
