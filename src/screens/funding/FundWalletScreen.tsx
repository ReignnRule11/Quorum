import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type FundWalletNavProp = NativeStackNavigationProp<RootStackParamList, 'FundWallet'>;

const PACKAGES = [
  { coins: 10, price: 0.10 },
  { coins: 50, price: 0.50 },
  { coins: 100, price: 1.00 },
  { coins: 500, price: 5.00 },
];

export default function FundWalletScreen() {
  const navigation = useNavigation<FundWalletNavProp>();

  const handleSelectPackage = (coins: number) => {
    navigation.navigate('PaymentMethod');
    // In a real implementation, pass coins to payment method screen.
    // Since we need coins available, we can store in context or params.
    // For simplicity, we'll navigate with params, but we need to modify RootNavigator to pass coins.
    // Alternative: navigate to PaymentMethod with coins param.
    navigation.navigate('CardPayment', { coins });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Coin Package</Text>
      {PACKAGES.map((pkg) => (
        <TouchableOpacity key={pkg.coins} style={styles.card} onPress={() => handleSelectPackage(pkg.coins)}>
          <Text style={styles.coins}>{pkg.coins} coins</Text>
          <Text style={styles.price}>${pkg.price.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}
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
