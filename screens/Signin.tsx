import { StackScreenProps } from "@react-navigation/stack";
import { View, Button, TextInput } from "react-native";
import { ScreenPathConfig, HomeStackParamList } from "../types";
import { Routes } from "../routes";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type SigninScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof Routes.SignIn
>;

export function SigninScreen({ navigation }: SigninScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const handleSignin = useCallback(async () => {
    signIn({ username, password });
  }, [navigation, username, password]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          padding: 12,
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1,
          marginBottom: 12,
          width: "80%",
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{
          padding: 12,
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1,
          marginBottom: 12,
          width: "80%",
        }}
      />

      <Button title="Sign in" onPress={handleSignin} />
    </View>
  );
}

export const SigninPathConfig: ScreenPathConfig<
  HomeStackParamList,
  typeof Routes.SignIn
> = {
  exact: true,
  path: "signin",
};
