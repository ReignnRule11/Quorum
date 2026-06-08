import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { apiClient } from '../../services/api';
import { useWallet } from '../../hooks/useWallet';
import { useNavigation } from '@react-navigation/native';

export default function BankTransferScreen() {
  const [coins, setCoins] = useState('');
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { refreshBalance } = useWallet();
  const navigation = useNavigation();

  const pickReceipt = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setReceiptUri(res[0].uri);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) Alert.alert('Error', 'Failed to pick document');
    }
  };

  const submitTransfer = async () => {
    if (!coins || parseInt(coins) <= 0) {
      Alert.alert('Invalid amount', 'Please enter a positive number of coins');
      return;
    }
    if (!receiptUri) {
      Alert.alert('Receipt required', 'Please upload a proof of transfer');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('coins', coins);
    formData.append('receipt', {
      uri: receiptUri,
      type: 'image/jpeg',
      name: 'receipt.jpg',
    } as any);
    try {
      await apiClient.post('/payments/bank-transfer/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert(
        'Transfer Submitted',
        'Your bank transfer will be verified within 24 hours. Coins will be credited after confirmation.'
      );
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Submission Failed', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bank Transfer Instructions</Text>
      <View style={styles.instructions}>
        <Text>Bank: Example Bank</Text>
        <Text>Account Name: QUORUM Holdings</Text>
        <Text>Account Number: 1234567890</Text>
        <Text>Reference: Your registered email</Text>
      </View>
      <TextInput
        placeholder="Number of coins (1 coin = $0.01)"
        keyboardType="numeric"
        value={coins}
        onChangeText={setCoins}
        style={styles.input}
      />
      <Button title={receiptUri ? 'Receipt Selected' : 'Upload Transfer Receipt'} onPress={pickReceipt} />
      {uploading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      <Button title="Submit Transfer Request" onPress={submitTransfer} disabled={uploading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  instructions: { backgroundColor: '#eef', padding: 16, borderRadius: 8, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 20 },
});
