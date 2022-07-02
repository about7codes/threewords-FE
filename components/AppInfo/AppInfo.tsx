import React from "react";
import Link from "next/link";
import { Paper, Typography, Slide } from "@mui/material";
import { styles as classes } from "./appInfo.styles";

const AppInfo = () => {
  return (
    <Slide in={true} direction="up">
      <Paper sx={classes.about}>
        <h2>Overview</h2>
        <Typography variant="body1">
          Threemax is a CRUD web application that allows you to create and
          manage your own list of phrases. It is built with React, Next JS,
          Context, and Material-UI and Node JS. You can add phrases to your
          list, and then view your list of phrases with others.
        </Typography>
        <h2>FrontEnd Code</h2>
        <Typography variant="body1" sx={classes.aboutLinks}>
          <Link href="https://github.com/about7codes/threewords-BE">
            https://github.com/about7codes/threewords-BE
          </Link>
        </Typography>
        <h2>BackEnd Code</h2>
        <Typography variant="body1" sx={classes.aboutLinks}>
          <Link href="https://github.com/about7codes/threewords-BE">
            https://github.com/about7codes/threewords-BE
          </Link>
        </Typography>
        <h2>Developer</h2>
        <Typography variant="body1" sx={classes.aboutLinks}>
          <Link href="https://github.com/about7codes">
            https://github.com/about7codes
          </Link>
        </Typography>
      </Paper>
    </Slide>
  );
};

export default AppInfo;
