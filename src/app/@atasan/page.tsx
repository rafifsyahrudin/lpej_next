import { getServerSession } from "next-auth";
import _Page from "./_page";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Unauthorized from "../_common/Unauthorized";
import prisma from "@/config/prisma";

export default async function AtasanPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Unauthorized />;
  }

  const foundStaf = await prisma.pegawai.findMany({
    where: {
      atasanId: Number(session.user.id),
    },
  });

  return <_Page nama={session.user.nama} staf={foundStaf} />;
}
