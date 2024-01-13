import { Container } from "@mui/material";
import { Role } from "@prisma/client";
import prisma from "@/config/prisma";
import _Page from "./_page";

export default async function Page() {
  const foundAllAtasan = await prisma.pegawai.findMany({
    where: {
      user: {
        role: Role.Atasan,
      },
    },
  });

  return <_Page listAtasan={foundAllAtasan} />;
}
