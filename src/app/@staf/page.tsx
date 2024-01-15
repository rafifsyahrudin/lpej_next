import { getServerSession } from "next-auth";
import _Page from "./_page";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Unauthorized from "../_common/Unauthorized";
import prisma from "@/config/prisma";

export default async function StafPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  const foundLaporanBulanan = await prisma.laporanBulanan.findMany({
    where: {
      pegawaiId: Number(session.user.id),
    },
    include: {
      status: true,
    },
  });

  return (
    <_Page nama={session.user.nama} laporanBulanan={foundLaporanBulanan} />
  );
}
