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
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SigninScreen } from "../screens/Signin";

type HomeStackProps = StackScreenProps<RootParamList, typeof Routes.HomeStack>;
const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = ({}: HomeStackProps) => {
  const { isSignedIn } = useContext(AuthContext);
  console.log("isSignedIn ", isSignedIn);
  return (
    <Stack.Navigator
      initialRouteName={isSignedIn ? Routes.Home : Routes.SignIn}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name={Routes.Home} component={HomeScreen} />
          <Stack.Screen name={Routes.Profile} component={Profile} />
        </>
      ) : (
        <>
          <Stack.Screen name={Routes.SignIn} component={SigninScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export const HomeStackPathConfig: ScreenPathConfig<
  RootParamList,
  typeof Routes.HomeStack
> = {
  path: "/",
  initialRouteName: Routes.Home,
  screens: {
    [Routes.Profile]: ProfilePathConfig,
    [Routes.Home]: HomePathConfig,
  },
};
