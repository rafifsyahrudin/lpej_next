import { getServerSession } from "next-auth";
import _Page from "./_page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Unauthorized from "@/app/_common/Unauthorized";
import prisma from "@/config/prisma";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  const foundLaporanBulananPegawai = await prisma.pegawai.findUniqueOrThrow({
    where: {
      id: Number(session.user.id),
    },
    select: {
      laporanBulanan: true,
    },
  });

  return (
    <_Page
      session={session}
      laporanBulananPegawai={foundLaporanBulananPegawai.laporanBulanan}
    />
  );
}
