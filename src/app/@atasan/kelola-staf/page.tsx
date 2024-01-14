import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import _Page from "./_page";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const foundUsers = await prisma.user.findMany({
    include: {
      pegawai: {
        include: {
          atasan: true,
        },
      },
    },
    where: {
      pegawai: {
        atasanId: Number(session?.user.id),
      },
    },
  });

  return <_Page users={foundUsers} />;
}
