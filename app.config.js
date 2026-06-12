import 'dotenv/config';

export default {
  expo: {
    name: "QUORUM Voting",
    slug: "quorum-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.quorum.voting",
      buildNumber: "1"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.quorum.voting",
      versionCode: 1
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-secure-store",
      "expo-notifications",
      "expo-local-authentication"
    ],
    extra: {
      apiUrl: process.env.API_URL,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    }
  }
};
