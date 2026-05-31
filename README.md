# QUORUM Mobile App

Voter-facing mobile application for the QUORUM transaction-backed voting platform.


## Project Structure

quorum-mobile/
├── .env.example
├── .gitignore
├── app.json
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── App.tsx
    ├── navigation/
    │   ├── AuthNavigator.tsx
    │   ├── MainTabs.tsx
    │   ├── RootNavigator.tsx
    │   └── types.ts
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginScreen.tsx
    │   │   └── RegisterScreen.tsx
    │   ├── main/
    │   │   ├── CampaignsScreen.tsx
    │   │   ├── CampaignDetailScreen.tsx
    │   │   ├── VoteScreen.tsx
    │   │   ├── WalletScreen.tsx
    │   │   ├── TransactionHistoryScreen.tsx
    │   │   └── NotificationsScreen.tsx
    │   └── funding/
    │       └── FundWalletScreen.tsx
    ├── context/
    │   ├── AuthContext.tsx
    │   ├── WalletContext.tsx
    │   └── VotingContext.tsx
    ├── services/
    │   ├── api.ts
    │   ├── storage.ts
    │   ├── notificationService.ts
    │   └── voteQueue.ts
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useWallet.ts
    │   └── useVoting.ts
    ├── types/
    │   └── index.ts
    └── utils/
        ├── errorHandler.ts
        └── idempotency.ts
## Features

- User registration & login (JWT)
- Wallet funding (mock provider for MVP)
- Browse active campaigns and nominees
- Cast votes (1 coin = 1 vote) with atomic transaction
- Offline vote queueing and retry
- Push notifications for vote confirmations, low balance, campaign ending
- Transaction history & audit trail

## Tech Stack

- React Native (Expo SDK 49)
- TypeScript
- React Navigation v6
- Axios for API calls
- AsyncStorage for offline queue
- SecureStore for token storage
- Expo Notifications

## Setup

1. Install dependencies:
   ```bash
   npm install
```

   1. Copy .env.example to .env and set API_URL to your backend URL.
2. Start the development server:
   ```bash
   npm start
   ```
3. Run on device:
   · iOS: npm run ios
   · Android: npm run android

Environment Variables

Variable Description
API_URL Backend REST API base URL (e.g., http://localhost:3000)

Building for Production

```bash
eas build --platform android
eas build --platform ios
```

Offline Behaviour

Votes cast without network are stored in a local queue (AsyncStorage) and automatically submitted when connectivity is restored. The queue is flushed on app start and on network state changes.

Testing

```bash
npm test
```

Folder Structure

· src/screens/ – All UI screens
· src/navigation/ – Navigation configuration
· src/context/ – React contexts for auth, wallet, voting
· src/services/ – API client, storage, notifications, vote queue
· src/hooks/ – Custom hooks for consuming contexts
· src/types/ – TypeScript interfaces
· src/utils/ – Utilities (idempotency, error handling)

License

Proprietary – QUORUM Infrastructure
