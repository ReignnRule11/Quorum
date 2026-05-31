# QUORUM Mobile App

Voter-facing mobile application for the QUORUM transaction-backed voting platform.

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
