import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/app.context";

// Hook to get the app context
export const useApp = () => {
  const [state, dispatch] = useContext<any>(AppContext);

  return [state, dispatch];
};

// Hook to check if the user is in mobile
export const useCheckMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.screen.width <= 600) {
      setIsMobile(!isMobile);
    }
  }, []);

  return isMobile;
};

// Hook to check if the user is logged in
export const useCheckLogin = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      console.log("route change complete ON");

      const authToken = parseCookies().aToken;
      if (!authToken) {
        return setIsLogged(false);
      }
      setIsLogged(true);
    });
    console.log("isLogged: ", isLogged);

    return () => {
      router.events.off("routeChangeComplete", () => {
        console.log("route change complete OFF");
      });
    };
  }, [router.events]);

  useEffect(() => {
    const authToken = parseCookies().aToken;
    if (authToken) {
      return setIsLogged(true);
    }
    setIsLogged(false);
  }, []);

  return isLogged;
};
