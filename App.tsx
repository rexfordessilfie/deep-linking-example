import React from "react";

import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { HomeStackPathConfig, RootTab } from "./navigators";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { Text, SafeAreaView } from "react-native";
import { linkingCache } from "./linkingCache";
import { Routes } from "./routes";
import { SettingsPathConfig } from "./screens";
import { RootParamList } from "./types";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

export const linking: LinkingOptions<RootParamList> = {
  prefixes: [prefix],
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    console.log("initial url ", url);
    if (url) {
      if (linkingCache.isSignedIn) {
        return url;
      } else {
        linkingCache.deepLinkUrl = url;
      }
    }
  },
  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
      console.log("url ", url);
      if (linkingCache.isSignedIn) {
        listener(url);
      } else {
        linkingCache.deepLinkUrl = url;
      }
    });

    return () => {
      linkingSubscription.remove();
    };
  },
  config: {
    screens: {
      [Routes.HomeStack]: HomeStackPathConfig,
      [Routes.Settings]: SettingsPathConfig,
    },
  },
};

function Root() {
  const { isLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Not signed in</Text>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <RootTab />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
