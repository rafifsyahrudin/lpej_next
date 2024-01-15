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
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import FormBuatLaporan, { TFormBuatLaporan } from "./_client/FormBuatLaporan";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function _Page({ session }: { session: Session }) {
  const r = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<
    { isOpen: boolean; message: string; severity?: AlertColor } & SnackbarOrigin
  >({
    vertical: "top",
    horizontal: "center",
    isOpen: false,
    message: "",
  });

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
          <Snackbar
            anchorOrigin={{
              vertical: snackbar.vertical,
              horizontal: snackbar.horizontal,
            }}
            open={snackbar.isOpen}
            onClose={() => {
              setSnackbar({
                ...snackbar,
                isOpen: false,
              });
            }}
            key={snackbar.horizontal + snackbar.vertical}
          >
            <Alert
              onClose={() => {
                setSnackbar({
                  ...snackbar,
                  isOpen: false,
                });
              }}
              severity={snackbar.severity}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
          <MyLoadingBox isLoading={isLoading}>
            <FormBuatLaporan
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
