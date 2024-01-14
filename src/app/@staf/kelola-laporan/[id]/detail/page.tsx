import _Page from "./_page";
import prisma from "@/config/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const foundLaporan = await prisma.laporan.findUniqueOrThrow({
    where: {
      id: Number(params.id),
    },
    include: {
      foto: true,
    },
  });

  return <_Page laporan={foundLaporan} />;
}
