import _Page from "./_page";
import prisma from "@/config/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const foundLaporanBulanan = await prisma.laporanBulanan.findUniqueOrThrow({
    where: {
      id: Number(params.id),
    },
    include: {
      pegawai: {
        include: {
          atasan: true,
        },
      },
      laporan: {
        include: {
          foto: true,
        },
      },
      status: true,
    },
  });

  return <_Page laporanBulanan={foundLaporanBulanan} />;
}
