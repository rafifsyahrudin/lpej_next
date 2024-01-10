import { Box, Typography } from "@mui/material";
import { Session, getServerSession } from "next-auth";
import { chdir } from "process";
import { PropsWithChildren, ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({
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

  switch (session?.user.role) {
    case "Admin":
      return (
        <>
          <Box component="section">{admin}</Box>
        </>
      );
    case "Atasan":
      return (
        <>
          <Box component="section">{atasan}</Box>
        </>
      );
    case "Staf":
      return (
        <>
          <Box component="section">{staf}</Box>
        </>
      );
  }
}
