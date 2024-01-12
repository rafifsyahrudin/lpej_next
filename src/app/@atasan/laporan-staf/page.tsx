import React from "react";
import SectionTableLaporanStaf from "./_client/SectionTableLaporanStaf";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Container>
        <SectionTableLaporanStaf session={session} />
      </Container>
    </>
  );
}
