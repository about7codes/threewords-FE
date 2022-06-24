import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { parseCookies } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";

interface IProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: IProtectedProps) {
  const router = useRouter();
  const authToken = parseCookies().aToken;
  if (!authToken) {
    router.push("/login");
  }

  // if (!true) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return <>{children}</>;
}
