import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../types";
import { useMemo } from "react";
import { Settings } from "../screens";
import { Routes } from "../routes";
import { HomeStack } from "./HomeStack";
import { useHandleDeepLinkCache } from "../hooks/useHandleDeepLinkCache";

const Tab = createBottomTabNavigator<RootParamList>();
type RootTabProps = {};

export const RootTab = ({}: RootTabProps) => {
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarIcon: () => null,
    }),
    [],
  );

  // Mount hook to handle cached deep links
  useHandleDeepLinkCache();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={Routes.HomeStack} component={HomeStack} />
      <Tab.Screen name={Routes.Settings} component={Settings} />
    </Tab.Navigator>
  );
};
