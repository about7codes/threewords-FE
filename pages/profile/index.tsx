import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { parseCookies } from "nookies";
import {
  Button,
  Box,
  Grid,
  Paper,
  Slide,
  Typography,
  CircularProgress,
} from "@mui/material";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import { styles as classes } from "./profile.styles";

// Fetch user profile from the database
export const getProfile = async (token: string) => {
  const response = await axios.get("https://maxthree.herokuapp.com/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch user profile from the database with react-query
export const useProfile = () => {
  const router = useRouter();
  const authToken = parseCookies().aToken;

  if (!authToken && typeof window !== "undefined") {
    router.push("/login");
    // return { data: {}, isLoading: false, error: null };
  }

  return useQuery(["profile", authToken], () => getProfile(authToken));
};

const Profile = () => {
  const { data: userProfile, isLoading, error } = useProfile();
  console.log("userProfile", userProfile);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <HeaderInfo title="Profile view Threemax" />
      <h1>Your Threemax Profile</h1>
      {userProfile && userProfile.user ? (
        <Slide in={true} direction="up">
          <Paper sx={{ padding: "20px" }}>
            <Grid container>
              <Grid item xs={12} sx={classes.imgBox}>
                <Box sx={classes.img}>
                  <Image
                    src="/trianglex.png"
                    alt="me"
                    width="164"
                    height="164"
                    className="sidebar-logo-img"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={classes.databox}>
                <Grid item xs={12} sx={classes.info}>
                  <Typography variant="body2" sx={classes.key}>
                    Username
                  </Typography>
                  <Typography variant="body1" sx={classes.val}>
                    {userProfile.user.username}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={classes.info}>
                  <Typography variant="body2" sx={classes.key}>
                    Created at
                  </Typography>
                  <Typography variant="body1" sx={classes.val}>
                    {new Date(userProfile.user.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={classes.info}>
                  <Typography variant="body2" sx={classes.key}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={classes.val}>
                    {userProfile.user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={classes.info}>
                  <Typography variant="body2" sx={classes.key}>
                    Email Provider
                  </Typography>
                  <Typography variant="body1" sx={classes.val}>
                    www.{userProfile.user.emailProvider}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={classes.info}>
                  <Typography variant="body2" sx={classes.key}>
                    Status
                  </Typography>
                  <Typography variant="body1" sx={classes.val}>
                    Active
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={classes.btnBox}>
                <Button
                  variant="contained"
                  size="large"
                  sx={classes.del}
                  disabled
                >
                  Delete account
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Slide>
      ) : (
        <Box>Error</Box>
      )}
    </div>
  );
};

Profile.auth = {
  required: true,
  loading: <div>Loading...</div>,
  redirectTo: "/login",
};

export default Profile;
