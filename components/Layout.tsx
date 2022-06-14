import React from "react";
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

interface ILayoutProps {
  children: React.ReactNode;
}

export const drawerWidth = 240;

const Layout = ({ children }: ILayoutProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Container className="layout">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Threemax
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Responsive app sidebar */}
        <SideBar barToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
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
          <h1>Threemax</h1>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
