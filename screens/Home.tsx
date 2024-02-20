import { useLinkTo } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Button } from "react-native";
import { ScreenPathConfig, HomeStackParamList } from "../types";
import { Routes } from "../routes";

type HomeScreenProps = StackScreenProps<HomeStackParamList, typeof Routes.Home>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const linkTo = useLinkTo();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Go to Wojciech's profile"
        onPress={() => linkTo("/stack/user/Wojciech?age=22")}
      />
      <Button
        title="Go to unknown profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

export const HomePathConfig: ScreenPathConfig<
  HomeStackParamList,
  typeof Routes.Home
> = {
  exact: true,
  path: "home",
};
