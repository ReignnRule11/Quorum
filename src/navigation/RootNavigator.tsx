import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';
import CampaignDetailScreen from '../screens/main/CampaignDetailScreen';
import VoteScreen from '../screens/main/VoteScreen';
import FundWalletScreen from '../screens/funding/FundWalletScreen';
import TransactionHistoryScreen from '../screens/main/TransactionHistoryScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // or a splash screen

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} options={{ headerShown: true, title: 'Campaign' }} />
          <Stack.Screen name="Vote" component={VoteScreen} options={{ headerShown: true, title: 'Cast Vote' }} />
          <Stack.Screen name="FundWallet" component={FundWalletScreen} options={{ headerShown: true, title: 'Fund Wallet' }} />
          <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} options={{ headerShown: true, title: 'Transactions' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
