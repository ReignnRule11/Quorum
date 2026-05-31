export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Campaigns: undefined;
  Wallet: undefined;
  Notifications: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  CampaignDetail: { campaignId: string };
  Vote: { campaignId: string; nomineeId: string; nomineeName: string };
  FundWallet: undefined;
  TransactionHistory: undefined;
};
