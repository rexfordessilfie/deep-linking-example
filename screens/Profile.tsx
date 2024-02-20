import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { ScreenPathConfig, HomeStackParamList } from "../types";
import { Routes } from "../routes";

type ProfileScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof Routes.Profile
>;

export function Profile({ route }: ProfileScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello {route.params?.id || "Unknown"}!</Text>
      <Text>Age: {route.params?.age || "Not provided"}</Text>
      <Text>
        Type of age parameter is{" "}
        {route.params?.age ? typeof route.params.age : "undefined"}
      </Text>
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
