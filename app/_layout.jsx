import { View, Text } from "react-native";
import Header from "@/components/Home/Header";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import LoginScreen from "../components/LoginScreen";
// import { SignInPage } from "../components/loginpage/page.tsx";
import SignUpScreen from "../components/loginpage/page.tsx";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </SignedIn>

      <SignedOut>
        {/* <LoginScreen /> */}
        <SignUpScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
