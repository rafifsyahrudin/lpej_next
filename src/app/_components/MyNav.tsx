"use client";

import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Tooltip } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export type TMenu = {
  icon: React.ReactNode;
  name: string;
  route: string;
};

export type Props = {
  mainMenu: TMenu[];
  secondaryMenu: TMenu[];
  nama: string;
};

export default function MyNav({
  children,
  mainMenu,
  secondaryMenu,
  nama,
}: React.PropsWithChildren<Props>) {
  const r = useRouter();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const pathname = usePathname();

  const MenuItem = ({ icon, name, route }: TMenu) => {
    const bgColor = pathname === route ? "whitesmoke" : "none";

    return (
      <NextLink
        href={route}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <ListItemButton
          sx={{
            bgcolor: bgColor,
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </NextLink>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              E-LAPKIN | {nama}
            </Typography>
            <Tooltip title="Sign Out">
              <IconButton
                color="inherit"
                onClick={async () => {
                  await signOut({ redirect: false, callbackUrl: "/sign-in" });
                  r.replace("/sign-in", {
                    scroll: true,
                  });
                  r.refresh();
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListSubheader component="div" inset>
                Menu Utama
              </ListSubheader>
              {mainMenu.map((menu, i) => {
                return (
                  <MenuItem
                    key={i}
                    icon={menu.icon}
                    name={menu.name}
                    route={menu.route}
                  />
                );
              })}
            </React.Fragment>
            {/* <React.Fragment>
              <ListSubheader component="div" inset>
                Menu Tambahan
              </ListSubheader>
              {secondaryMenu.map((menu, i) => {
                return (
                  <MenuItem
                    key={i}
                    icon={menu.icon}
                    name={menu.name}
                    route={menu.route}
                  />
                );
              })}
            </React.Fragment> */}
          </List>
        </Drawer>
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {children}
          <Copyright
            sx={{
              mt: "auto",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
