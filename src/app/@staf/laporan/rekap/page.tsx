import { Box, Container, Typography } from "@mui/material";
import TableRekapLaporan from "./_client/TableRekapLaporan";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Typography>Login Required</Typography>;
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

  return (
    <Container>
      <Box
        sx={{
          p: 2,
        }}
      >
        <TableRekapLaporan laporan={foundCurrentPegawai.laporan} />
      </Box>
    </Container>
  );
}
