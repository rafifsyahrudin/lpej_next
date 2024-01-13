"use client";

import { Box, Container, Typography } from "@mui/material";
import React from "react";
import FormAjukanLaporanBulanan from "./_client/FormAjukanLaporanBulanan";
import { Session } from "next-auth";

export default function _Page({ session }: { session: Session | null }) {
  return (
    <>
      <Container>
        <Box>
          <FormAjukanLaporanBulanan session={session} />
        </Box>
      </Container>
    </>
  );
}
