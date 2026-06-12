# QUORUM Mobile Voting App
Voter-facing mobile application for the QUORUM transaction-backed voting platform.


[![CI](https://github.com/ReignnRule11/quorum-mobile/actions/workflows/ci.yml/badge.svg)](https://github.com/ReignnRule11/quorum-mobile/actions/workflows/ci.yml)

Production-ready mobile client for QUORUM – transaction-backed digital voting.

## Tech Stack
- Expo SDK 54
- React Native 0.76
- TypeScript
- Stripe SDK
- React Navigation v6

## Features
- JWT authentication with biometric login
- Wallet with real-time balance
- Stripe card payments
- Bank transfer with receipt upload
- Atomic voting (1 coin = 1 vote)
- Offline vote queue with auto-retry
- Push notifications
- Full transaction history

## Setup

1. Clone repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your backend URL and Stripe publishable key
4. Generate asset placeholders: `chmod +x generate-assets.sh && ./generate-assets.sh`
5. Start development: `npm start`

## Environment Variables
| Variable | Description |
|----------|-------------|
| `API_URL` | Backend REST API URL |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key (test or live) |

## Building for Production
```bash
eas build --platform android --profile production
eas build --platform ios --profile production


## Building for Production
```bash
eas build --platform android --profile production
eas build --platform ios --profile production

## Project Structure
quorum-mobile/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── eas-build.yml
├── .env.example
├── .gitignore
├── app.config.js
├── eas.json
├── package.json
├── tsconfig.json
├── README.md
├── generate-assets.sh
├── assets/
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── src/
│   ├── App.tsx
│   ├── navigation/
│   │   ├── AuthNavigator.tsx
│   │   ├── MainTabs.tsx
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── main/
│   │   │   ├── CampaignsScreen.tsx
│   │   │   ├── CampaignDetailScreen.tsx
│   │   │   ├── VoteScreen.tsx
│   │   │   ├── WalletScreen.tsx
│   │   │   ├── TransactionHistoryScreen.tsx
│   │   │   └── NotificationsScreen.tsx
│   │   └── funding/
│   │       ├── FundWalletScreen.tsx
│   │       ├── PaymentMethodScreen.tsx
│   │       ├── CardPaymentScreen.tsx
│   │       └── BankTransferScreen.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── WalletContext.tsx
│   │   └── VotingContext.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── storage.ts
│   │   ├── notificationService.ts
│   │   └── voteQueue.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useWallet.ts
│   │   └── useVoting.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── errorHandler.ts
│       └── idempotency.ts
└── .expo-shared/
    └── assets.json

## Tech Stack
- Expo SDK 54
- React Native 0.76
- TypeScript
- Stripe SDK
- React Navigation v6

## Features
- JWT authentication with biometric login
- Wallet with real-time balance
- Stripe card payments
- Bank transfer with receipt upload
- Atomic voting (1 coin = 1 vote)
- Offline vote queue with auto-retry
- Push notifications
- Full transaction history

## Setup

1. Clone repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your backend URL and Stripe publishable key
4. Generate asset placeholders: `chmod +x generate-assets.sh && ./generate-assets.sh`
5. Start development: `npm start`

## Environment Variables
| Variable | Description |
|----------|-------------|
| https://quorum-backend-1.onrender.com | Backend REST API URL |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key (test or live) |

## Building for Production
```bash
eas build --platform android --profile production
eas build --platform ios --profile production

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
