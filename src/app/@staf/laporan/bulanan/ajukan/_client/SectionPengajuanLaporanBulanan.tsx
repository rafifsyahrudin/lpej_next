"use client";

import { Box, Container, Typography } from "@mui/material";
import React, { Suspense } from "react";
import FormAjukanLaporanBulanan from "./FormAjukanLaporanBulanan";
import { Session } from "next-auth";

export default function SectionPengajuanLaporanBulanan({
  session,
}: {
  session: Session | null;
}) {
  return (
    <>
      <Box>
        <FormAjukanLaporanBulanan session={session} />
      </Box>
    </>
  );
}
