import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import MyNav, { TMenu } from "./_components/MyNav";
import { PropsWithChildren, ReactNode } from "react";
import PostAddIcon from "@mui/icons-material/PostAddOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import TocIcon from "@mui/icons-material/TocOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import ReportIcon from "@mui/icons-material/Report";
import BookIcon from "@mui/icons-material/BookOutlined";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

let menu: {
  main: TMenu[];
  secondary: TMenu[];
};

export default async function RootLayout({
  children,
  admin,
  atasan,
  staf,
}: PropsWithChildren<{
  admin: ReactNode;
  atasan: ReactNode;
  staf: ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session) {
    switch (session.user.role) {
      case "Staf":
        menu = {
          main: [
            {
              icon: <HomeIcon />,
              name: "Dashboard",
              route: "/",
            },
            {
              icon: <PostAddIcon />,
              name: "Buat Laporan",
              route: "/kelola-laporan/buat",
            },
            {
              icon: <TocIcon />,
              name: "Laporan Bulanan",
              route: "/kelola-laporan/bulanan",
            },
            {
              icon: <BookIcon />,
              name: "Rekap Laporan",
              route: "/kelola-laporan/rekap",
            },
          ],
          secondary: [],
        };
        break;
      case "Atasan":
        menu = {
          main: [
            {
              icon: <HomeIcon />,
              name: "Dashboard",
              route: "/",
            },
            {
              icon: <BookIcon />,
              name: "Kelola Laporan Staf",
              route: "/kelola-laporan-staf",
            },
            {
              icon: <GroupsIcon />,
              name: "Kelola Staf",
              route: "/kelola-staf",
            },
          ],
          secondary: [],
        };
        break;
      case "Admin":
        menu = {
          main: [
            {
              icon: <HomeIcon />,
              name: "Dashboard",
              route: "/",
            },
            {
              icon: <PeopleIcon />,
              name: "Kelola User",
              route: "/kelola-user",
            },
          ],
          secondary: [],
        };
        break;
    }
  }

  if (!session) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </html>
    );
  }

  if (session.user.role === "Staf") {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <MyNav
              nama={session.user.nama}
              mainMenu={menu.main}
              secondaryMenu={menu.secondary}
            >
              {staf}
            </MyNav>
          </AppRouterCacheProvider>
        </body>
      </html>
    );
  } else if (session.user.role === "Atasan") {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <MyNav
              nama={session.user.nama}
              mainMenu={menu.main}
              secondaryMenu={menu.secondary}
            >
              {atasan}
            </MyNav>
          </AppRouterCacheProvider>
        </body>
      </html>
    );
  } else if (session.user.role === "Admin") {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <MyNav
              nama={session.user.nama}
              mainMenu={menu.main}
              secondaryMenu={menu.secondary}
            >
              {admin}
            </MyNav>
          </AppRouterCacheProvider>
        </body>
      </html>
    );
  }
}
