import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Fade,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";

import { styles as classes } from "./login.styles";
import { useApp } from "../../hooks/app.hooks";

interface IFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [, dispatch] = useApp();

  const handleSubmit = async (values: IFormValues) => {
    console.log(values);
    // login({ email: values.email, password: values.password });
    try {
      setLoading(true);
      // @ts-ignore
      const { ok, error } = await signIn("credentials", {
        username: values.email,
        password: values.password,
        redirect: false,
      });
      console.log("SignInRES", error);
      if (!ok) throw new Error("Failed to signin.");
      setLoading(false);
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "success",
          message: "Signed in successfully",
          open: true,
        },
      });
      return router.push("/");
    } catch (error) {
      console.log("SignInError", error);
      setLoading(false);
      dispatch({
        type: "SET_NOTIFY",
        payload: {
          type: "error",
          // @ts-ignore
          message: error.message || "Something went wrong",
          open: true,
        },
      });
    }
  };
  const formikSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Please enter your email."),
    password: Yup.string()
      .min(4, "Too short.")
      .required("Please enter your password."),
  });

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formikSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container sx={classes.sign}>
      <Fade in={true}>
        <Grid container sx={classes.signInner}>
          <Grid item justifyContent="center" display="flex">
            <Image
              src="/trianglex.png"
              alt="Threemax logo"
              width="36px"
              height="36px"
              style={classes.logo}
              className="1logo-img"
            />
          </Grid>
          <Grid item sx={classes.signInnerHeader}>
            <Typography variant="h2">Sign In</Typography>
          </Grid>
          <Grid item>
            <Box>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      variant="standard"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword((prev) => (prev ? false : true))
                              }
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <LoadingButton
                fullWidth
                loading={loading}
                sx={classes.submit}
                variant="contained"
                onClick={() => formik.handleSubmit()}
              >
                Sign In
              </LoadingButton>
              <Link href="/signup" style={classes.altBtn}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={classes.submit}
                >
                  Don't have an account?
                </Button>
              </Link>
              {/* <Box sx={classes.links}>
                <Link href="/">
                  <MuiLink sx={classes.link}>Forgot password ?</MuiLink>
                </Link>
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
}

// export const getInitialProps = async (ctx) => {}

Login.getInitialProps = async (ctx: NextPageContext) => {
  const { req, res } = ctx;
  const session = await getSession({ req });
  console.log(session);

  if (session && res && session.user) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    csrfToken: await getCsrfToken(ctx),
    providers: await getProviders(),
    session: undefined,
  };
};

// export default Login;
