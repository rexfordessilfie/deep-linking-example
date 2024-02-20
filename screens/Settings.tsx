import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { ScreenPathConfig, RootParamList } from "../types";
import { Routes } from "../routes";

type SettingsScreenProps = StackScreenProps<
  RootParamList,
  typeof Routes.Settings
>;

export function Settings({}: SettingsScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the Settings Page.</Text>
    </View>
  );
}

export const SettingsPathConfig: ScreenPathConfig<
  RootParamList,
  typeof Routes.Settings
> = {
  exact: true,
  path: "/settings",
};
