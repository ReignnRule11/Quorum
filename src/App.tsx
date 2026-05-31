
---

## 2. Source Code

### `src/App.tsx`
```tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { VotingProvider } from './context/VotingContext';
import { RootNavigator } from './navigation/RootNavigator';
import { registerForPushNotificationsAsync } from './services/notificationService';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WalletProvider>
          <VotingProvider>
            <NavigationContainer>
              <RootNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </VotingProvider>
        </WalletProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
