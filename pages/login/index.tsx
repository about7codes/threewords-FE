import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { styles as classes } from "./login.styles";
// import { isAuthenticated } from "../../auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(isAuthenticated()) navigate("/account");
  // }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // localStorage.setItem("token", "true");
    // navigate("/account");
  };

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
            <form onSubmit={handleSubmit}>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      fullWidth
                      id="input-email"
                      label="Email"
                      type="email"
                      variant="standard"
                      // sx={classes.emailInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      id="input-password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      // sx={classes.passwordInput}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={classes.submit}
                disabled={email === "" || password === ""}
              >
                Sign In
              </Button>
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
              <Box sx={classes.links}>
                <Link href="/">
                  <MuiLink sx={classes.link}>Forgot password ?</MuiLink>
                </Link>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
};

export default Login;
