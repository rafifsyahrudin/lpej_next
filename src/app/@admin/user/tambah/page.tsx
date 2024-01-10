import { Container } from "@mui/material";
import { Role } from "@prisma/client";
import prisma from "@/config/prisma";
import SectionTambahPengguna from "./_client/SectionTambahPengguna";

export default async function Page() {
  const listAtasan = await prisma.pegawai.findMany({
    where: {
      user: {
        role: Role.Atasan,
      },
    },
  });

  return (
    <>
      <Container>
        <SectionTambahPengguna listAtasan={listAtasan} />
      </Container>
    </>
  );
}
