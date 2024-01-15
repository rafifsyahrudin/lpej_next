import { getServerSession } from "next-auth";
import _Page from "./_page";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Unauthorized from "../_common/Unauthorized";
import prisma from "@/config/prisma";
import { Role } from "@prisma/client";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  const foundAllPegawai = await prisma.pegawai.findMany({
    where: {
      user: {
        role: {
          not: Role.Admin,
        },
      },
    },
    include: {
      user: true,
    },
  });

  const foundAllLaporanBulanan = await prisma.laporanBulanan.findMany();

  return (
    <_Page pegawai={foundAllPegawai} laporanBulanan={foundAllLaporanBulanan} />
  );
}
