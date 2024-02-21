import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { linkingCache } from "../linkingCache";
import * as Linking from "expo-linking";
import { useLinkTo } from "@react-navigation/native";

export function useHandleDeepLinkCache() {
  const { isSignedIn } = useContext(AuthContext);
  const linkTo = useLinkTo();

  // Handle unhandled deep links
  useEffect(() => {
    if (isSignedIn) {
      if (linkingCache.deepLinkUrl) {
        try {
          // stripping expo from the path
          const prefix = Linking.createURL("");
          const url = linkingCache.deepLinkUrl.replace(prefix, "");
          console.log("url post signin ", url, prefix);
          url && linkTo(`/${url}`);
        } catch (e) {
          console.log("error ", e);
        }
        linkingCache.deepLinkUrl = "";
      }
    }
  }, [isSignedIn]);
}
