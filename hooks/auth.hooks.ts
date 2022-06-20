import Cookie from "js-cookie";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { useApp } from "./app.hooks";
import { loginRequest } from "../api/auth.api";

export const useLogin = () => {
  const [, dispatch] = useApp();

  const router = useRouter();
  return useMutation(loginRequest, {
    onSuccess: (data) => {
      console.log("success: ", data);
      // Cookie.set("aToken", data.authToken);
      // Cookie.set("rToken", data.refreshToken);
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
