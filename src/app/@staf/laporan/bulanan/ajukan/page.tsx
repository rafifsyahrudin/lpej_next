import { Box, Container, FormControl } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import FormAjukanLaporanBulanan from "./_client/FormAjukanLaporanBulanan";
import SectionPengajuanLaporanBulanan from "./_client/SectionPengajuanLaporanBulanan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Container>
        <SectionPengajuanLaporanBulanan session={session} />
      </Container>
    </>
  );
}
