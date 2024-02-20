import { NavigatorScreenParams, PathConfigMap } from "@react-navigation/native";
import { Routes } from "./routes";

export type RootParamList = {
  [Routes.HomeStack]: NavigatorScreenParams<HomeStackParamList>;
  [Routes.Settings]: undefined;
};

export type HomeStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Profile]: {
    id: string;
    age?: number;
  };
};

export type ScreenPathConfig<
  ParamList extends {},
  K extends keyof ParamList
> = PathConfigMap<ParamList>[K];
