import React from "react";

import * as Linking from "expo-linking";

import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { RootParamList } from "./types";
import { SettingsPathConfig } from "./screens";
import { RootTab, HomeStackPathConfig } from "./navigators";
import { Routes } from "./routes";
const prefix = Linking.createURL("/");

const linking: LinkingOptions<RootParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      [Routes.HomeStack]: HomeStackPathConfig,
      [Routes.Settings]: SettingsPathConfig,
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootTab />
    </NavigationContainer>
  );
}
