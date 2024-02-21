import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useMemo, useReducer } from "react";
import { linkingCache } from "../linkingCache";

type AuthContextValue = {
  userToken: string | null;
  signOut: () => void;
  signIn: (data: any) => void;
  isLoading: boolean;
  isSignedIn: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  isSignedIn: false,
  isLoading: true,
  userToken: null,
  signOut: () => {},
  signIn: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      const isSignedIn = action.token ? true : false;

      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isSignedIn,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignedIn,
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

  // Fetch the token from storage then navigate to our appropriate place
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    linkingCache.isSignedIn = state.isSignedIn;
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      signIn: async (data) => {
        await AsyncStorage.setItem("userToken", "dummy-auth-token");
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: async () => {
        dispatch({ type: "SIGN_OUT" });
        await AsyncStorage.removeItem("userToken");
      },
      signUp: async (data) => {
        await AsyncStorage.setItem("userToken", "dummy-auth-token");
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    [state],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
