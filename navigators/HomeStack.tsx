import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootParamList, HomeStackParamList, ScreenPathConfig } from "../types";
import {
  HomeScreen,
  HomePathConfig,
  Profile,
  ProfilePathConfig,
} from "../screens";
import { Routes } from "../routes";

type HomeStackProps = StackScreenProps<RootParamList, typeof Routes.HomeStack>;
const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = ({}: HomeStackProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen name={Routes.Profile} component={Profile} />
    </Stack.Navigator>
  );
};

export const HomeStackPathConfig: ScreenPathConfig<
  RootParamList,
  typeof Routes.HomeStack
> = {
  path: "/",
  screens: {
    [Routes.Profile]: ProfilePathConfig,
    [Routes.Home]: HomePathConfig,
  },
};
