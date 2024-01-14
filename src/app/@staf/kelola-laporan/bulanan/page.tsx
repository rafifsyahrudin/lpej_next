import { getServerSession } from "next-auth";
import _Page from "./_page";
import prisma from "@/config/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/app/_common/Unauthorized";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  const foundCurrentPegawaiLaporanBulanan =
    await prisma.laporanBulanan.findMany({
      where: {
        pegawaiId: Number(session.user.id),
      },
      include: {
        pegawai: {
          include: {
            atasan: true,
          },
        },
        laporan: true,
        status: true,
      },
    });

  return <_Page laporanBulanan={foundCurrentPegawaiLaporanBulanan} />;
}
