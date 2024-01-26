"use client";

import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Stack,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import FormBuatLaporan, { TFormBuatLaporan } from "./_client/FormBuatLaporan";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { MyNavContext } from "@/app/_components/MyNav";
import { LaporanBulanan } from "@prisma/client";

export default function _Page({
  session,
  laporanBulananPegawai,
}: {
  session: Session;
  laporanBulananPegawai: LaporanBulanan[];
}) {
  const r = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useContext(MyNavContext);

  return (
    <>
      <Container>
        <Box
          component="section"
          sx={{
            my: 2,
            p: 2,
          }}
        >
          <MyLoadingBox isLoading={isLoading}>
            <FormBuatLaporan
              laporanBulananPegawai={laporanBulananPegawai}
              onSubmit={async (data, reset) => {
                try {
                  setIsLoading(true);
                  const res = await axios({
                    url: "/api/laporan/bulanan",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    data: {
                      pegawaiId: session.user.id,
                      bulan: data.bulan,
                      laporan: data.laporan,
                    },
                  });
                  reset();
                  setSnackbar((oldV) => ({
                    ...oldV,
                    isOpen: true,
                    message: "Laporan berhasil dibuat",
                    severity: "success",
                  }));
                } catch (error) {
                  console.log(error);
                  setSnackbar((oldV) => ({
                    ...oldV,
                    isOpen: true,
                    message: "Gagal membuat laporan",
                    severity: "error",
                  }));
                } finally {
                  setIsLoading(false);
                  r.refresh();
                }
              }}
            />
          </MyLoadingBox>
        </Box>
      </Container>
    </>
  );
}
