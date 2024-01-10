"use client";

import MyLoadingBox from "@/app/_components/MyLoadingBox";
import { Box } from "@mui/material";
import React, { useState } from "react";
import FormTambahUser from "./FormTambahUser";
import { Pegawai } from "@prisma/client";

export default function SectionTambahPengguna({
  listAtasan,
}: {
  listAtasan: Pegawai[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Box
        component="section"
        sx={{
          my: 2,
          p: 2,
        }}
      >
        <MyLoadingBox isLoading={isLoading}>
          <FormTambahUser listAtasan={listAtasan} />
        </MyLoadingBox>
      </Box>
    </>
  );
}
