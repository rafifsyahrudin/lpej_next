import prisma from "@/config/prisma";
import _Page from "./_page";

export default async function Page() {
  const foundAllUsers = await prisma.user.findMany({
    include: {
      pegawai: {
        include: {
          atasan: true,
        },
      },
    },
  });

  return <_Page users={foundAllUsers} />;
}
