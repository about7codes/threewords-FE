import Cookie from "js-cookie";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { useApp } from "./app.hooks";
import { loginRequest, signupRequest } from "../api/auth.api";
import { setCookie } from "nookies";

// Login User with react-query
export const useLogin = () => {
  const [, dispatch] = useApp();

  const router = useRouter();
  return useMutation(loginRequest, {
    onSuccess: (data) => {
      console.log("success: ", data);
      setCookie(null, "aToken", data.authToken, {
        maxAge: 60,
        path: "/",
      });
      setCookie(null, "rToken", data.refreshToken, {
        maxAge: 60,
        path: "/",
      });
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "success",
          // @ts-ignore
          message: "Signed in successfully",
          open: true,
        },
      });
      router.push("/all");
    },
    onError: (error: AxiosError) => {
      console.log("Error1: ", error.response?.data);
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "error",
          // @ts-ignore
          message: error.response?.data?.error || "Something went wrong",
          open: true,
        },
      });
    },
  });
};

// Signup User with react-query
export const useSignup = () => {
  const [, dispatch] = useApp();

  const router = useRouter();
  return useMutation(signupRequest, {
    onSuccess: (data) => {
      console.log("success: ", data);
      setCookie(null, "aToken", data.authToken, {
        maxAge: 60,
        path: "/",
      });
      setCookie(null, "rToken", data.refreshToken, {
        maxAge: 60,
        path: "/",
      });
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "success",
          // @ts-ignore
          message: "Account created & logged in successfully",
          open: true,
        },
      });
      router.push("/all");
    },
    onError: (error: AxiosError) => {
      console.log("Error1: ", error.response?.data);
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "error",
          message:
            // @ts-ignore
            error.response?.data?.error ||
            error.message ||
            "Something went wrong",
          open: true,
        },
      });
    },
  });
};
