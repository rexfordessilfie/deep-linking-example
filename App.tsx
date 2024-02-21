import React, { useMemo } from "react";

import * as Linking from "expo-linking";

import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { RootParamList } from "./types";
import { SettingsPathConfig } from "./screens";
import { RootTab, HomeStackPathConfig } from "./navigators";
import { Routes } from "./routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./context/AuthContext";
import { View, Text } from "react-native";
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
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isSignedIn: action.token ? true : false,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignedIn: false,
            userToken: null,
          };
      }
    },
    {
      isSignedIn: false,
      isLoading: true,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      ...state,
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: async () => {
        dispatch({ type: "SIGN_OUT" });
        await AsyncStorage.removeItem("userToken");
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    [state],
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer linking={linking}>
        <RootTab />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
