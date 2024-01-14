import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import _Page from "./_page";
import Unauthorized from "@/app/_common/Unauthorized";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  const foundCurrentPegawai = await prisma.pegawai.findUniqueOrThrow({
    where: {
      id: Number(session.user.id),
    },
    include: {
      laporan: {
        include: {
          foto: true,
        },
      },
    },
  });

  return <_Page laporan={foundCurrentPegawai.laporan} />;
}
