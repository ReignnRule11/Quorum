import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type PaymentMethodNavProp = NativeStackNavigationProp<RootStackParamList, 'PaymentMethod'>;

export default function PaymentMethodScreen() {
  const navigation = useNavigation<PaymentMethodNavProp>();
  const route = useRoute();
  // @ts-ignore - coins passed from FundWalletScreen
  const { coins } = route.params || { coins: 10 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CardPayment', { coins })}
      >
        <Text style={styles.methodName}>💳 Credit / Debit Card</Text>
        <Text style={styles.methodDesc}>Pay instantly with Stripe (secure)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('BankTransfer')}
      >
        <Text style={styles.methodName}>🏦 Bank Transfer</Text>
        <Text style={styles.methodDesc}>Manual transfer, upload receipt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f5f5f5', padding: 20, borderRadius: 12, marginBottom: 16 },
  methodName: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  methodDesc: { fontSize: 14, color: '#555' },
});
