import { createContext } from "react";

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
