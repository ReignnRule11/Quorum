import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { apiClient } from '../../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CampaignDetailRouteProp = RouteProp<RootStackParamList, 'CampaignDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Nominee {
  id: string;
  name: string;
  description: string;
  voteCount?: number;
}

export default function CampaignDetailScreen() {
  const route = useRoute<CampaignDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { campaignId } = route.params;
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [campaignTitle, setCampaignTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  const fetchCampaignDetails = async () => {
    try {
      const [campaignRes, nomineesRes] = await Promise.all([
        apiClient.get(`/campaigns/${campaignId}`),
        apiClient.get(`/campaigns/${campaignId}/nominees`),
      ]);
      setCampaignTitle(campaignRes.data.title);
      setNominees(nomineesRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (nominee: Nominee) => {
    navigation.navigate('Vote', { campaignId, nomineeId: nominee.id, nomineeName: nominee.name });
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.campaignTitle}>{campaignTitle}</Text>
      <FlatList
        data={nominees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nomineeCard}>
            <Text style={styles.nomineeName}>{item.name}</Text>
            <Text style={styles.nomineeDesc}>{item.description}</Text>
            <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(item)}>
              <Text style={styles.voteButtonText}>Vote (1 coin)</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  campaignTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  nomineeCard: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, marginBottom: 12 },
  nomineeName: { fontSize: 18, fontWeight: '600' },
  nomineeDesc: { marginTop: 4, color: '#666' },
  voteButton: { marginTop: 12, backgroundColor: '#0a7ea4', padding: 10, borderRadius: 8, alignItems: 'center' },
  voteButtonText: { color: 'white', fontWeight: '600' },
});
