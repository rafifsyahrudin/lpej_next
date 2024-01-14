"use client";

import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Dashboard({ nama }: { nama: string }) {
  return (
    <>
      <Container
        sx={{
          mt: 4,
        }}
      >
        <Typography variant="h4">Selamat Datang {nama}</Typography>
      </Container>
    </>
  );
}
