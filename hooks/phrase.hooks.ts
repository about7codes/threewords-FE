import { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deletePhrase, getAllPhrases, updatePhrase } from "../api/phrase.api";
import { useApp } from "./app.hooks";

// Fetch all phrases from the database with react-query
export const useAllPhrases = () => {
  const router = useRouter();
  const authToken = parseCookies().aToken;

  if (!authToken && typeof window !== "undefined") {
    router.push("/login");
    // return { data: { phrases: [] }, isLoading: false, error: null };
  }

  return useQuery(["allphrases", authToken], () => getAllPhrases(authToken));
};

// Update a phrase from the database with react-query
export const useUpdatePhrase = () => {
  const [, dispatch] = useApp();
  const cache = useQueryClient();

  return useMutation(updatePhrase, {
    onSuccess: (data) => {
      // Update cache data
      cache.invalidateQueries("allphrases");

      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "success",
          message: data.message || "Updated successfully",
          open: true,
        },
      });
      console.log("UpdateSuccess: ", data);
    },

    onError: (error: AxiosError) => {
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
      console.log("UpdateError: ", error);
    },
  });
};

// Delete a phrase from the database with react-query
export const useDeletePhrase = () => {
  const cache = useQueryClient();
  const [, dispatch] = useApp();

  return useMutation(deletePhrase, {
    onSuccess: (data) => {
      console.log("Deletedata", data);
      // Update cache data
      cache.invalidateQueries("allphrases");
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "success",
          message: data.message || "Deleted successfully",
          open: true,
        },
      });
    },
    onError: (error: AxiosError) => {
      console.log("DelError: ", error.response?.data);
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
