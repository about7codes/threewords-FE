import React from "react";
import { useRouter } from "next/router";
import {
  CssBaseline,
  Container,
  Box,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar/SideBar";
import Notify from "./Notify/Notify";

interface ILayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Layout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (path?: string) => {
    setMobileOpen(!mobileOpen);

    if (path) router.push(path);
  };

  return (
    <Container className="layout">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Notify />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${0}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: 99999,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => handleDrawerToggle()}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Threemax
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Responsive app sidebar */}
        <SideBar
          barToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
