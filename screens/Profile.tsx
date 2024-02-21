import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";
import { ScreenPathConfig, HomeStackParamList } from "../types";
import { Routes } from "../routes";
import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type ProfileScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof Routes.Profile
>;

export function Profile({ route, navigation }: ProfileScreenProps) {
  const { signOut } = useContext(AuthContext);
  const handleSignOut = useCallback(() => {
    signOut();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello {route.params?.id || "Unknown"}!</Text>
      <Text>Age: {route.params?.age || "Not provided"}</Text>
      <Text>
        Type of age parameter is{" "}
        {route.params?.age ? typeof route.params.age : "undefined"}
      </Text>

      <Button title="Home" onPress={() => navigation.navigate(Routes.Home)} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

export const ProfilePathConfig: ScreenPathConfig<
  HomeStackParamList,
  typeof Routes.Profile
> = {
  exact: true,
  path: "/user/:id",
  parse: {
    id: (id) => `there, ${id}`,
    age: Number,
  },
  stringify: {
    id: (id) => id.replace("there, ", ""),
  },
};
