import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const appRoutes = [
  {
    name: "All Phrases",
    icon: <InboxIcon />,
    href: "/all",
  },
  {
    name: "Create Phrase",
    icon: <InboxIcon />,
    href: "/create",
  },
  {
    name: "Profile",
    icon: <InboxIcon />,
    href: "/profile",
  },
  {
    name: "About",
    icon: <InboxIcon />,
    href: "/about",
  },
];

interface ISideBarProps {
  barToggle: (path: string) => void;
  mobileOpen: boolean;
  drawerWidth: number;
}

const SideBar = ({ barToggle, mobileOpen, drawerWidth }: ISideBarProps) => {
  const router = useRouter();
  const drawer = (
    <div>
      <Toolbar />
      <Box className="sidebar-logo">
        <Image
          src="/trianglex.png"
          alt="me"
          width="164"
          height="164"
          className="sidebar-logo-img"
        />
      </Box>
      <Divider />
      <List>
        {appRoutes.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              onClick={() => barToggle(item.href)}
              selected={router.asPath === item.href}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/login")}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/login")}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  //   const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="app sidebar"
      >
        {/* Mobile nav */}
        <Drawer
          //   container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={barToggle}
          ModalProps={{
            keepMounted: true,
          }}
          className="sidebar-drawer"
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop nav */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
};

export default SideBar;
