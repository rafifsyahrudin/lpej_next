import { Button, Container, Paper, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SectionBuatLaporan from "./_client/SectionBuatLaporan";

export default function Page() {
  return (
    <>
      <Container>
        <SectionBuatLaporan />
      </Container>
    </>
  );
}
