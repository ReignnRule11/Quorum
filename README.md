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
