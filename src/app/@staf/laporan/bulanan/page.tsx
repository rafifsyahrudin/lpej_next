import { getServerSession } from "next-auth";
import SectionGenerateLaporanBulanan from "./_client/SectionGenerateLaporanBulanan";
import prisma from "@/config/prisma";
import { Container, Typography } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMonthName } from "@/utils/month-name";
import { Prisma } from "@prisma/client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Typography>Required Sign In</Typography>;
  }

  const foundLaporanBulanan = await prisma.laporanBulanan.findMany({
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
    },
  });

  return (
    <>
      <Container
        sx={{
          my: 2,
        }}
      >
        <SectionGenerateLaporanBulanan laporanBulanan={foundLaporanBulanan} />
      </Container>
    </>
  );
}
