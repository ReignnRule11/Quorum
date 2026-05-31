import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { apiClient } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type CampaignsScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface Campaign {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function CampaignsScreen() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<CampaignsScreenNavProp>();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await apiClient.get('/campaigns?status=ACTIVE');
      setCampaigns(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Campaign }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CampaignDetail', { campaignId: item.id })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <FlatList data={campaigns} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={{ padding: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { marginTop: 4, color: '#555' },
  status: { marginTop: 8, color: '#0a7ea4', fontWeight: '500' },
});
