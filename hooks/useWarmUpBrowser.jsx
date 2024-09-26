import { View, Text } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as warmUpBrowser from "expo-warm-up-browser";

export default function useWarmUpBrowser() {
  React.useEffect(() => {
    void warmUpBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}
