import _Page from "./_page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/app/_common/Unauthorized";
import prisma from "@/config/prisma";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  const foundLaporanBulananStaf = await prisma.laporanBulanan.findMany({
    where: {
      pegawai: {
        atasanId: Number(session.user.id),
      },
    },
    include: {
      pegawai: true,
      status: true,
    },
  });

  const foundLaporanBulananStafDiajukan = foundLaporanBulananStaf.filter(
    (lb) => lb.status.length > 0
  );

  return <_Page laporanBulananStaf={foundLaporanBulananStafDiajukan} />;
}
