"use client";

import MyLoadingBox from "@/app/_components/MyLoadingBox";
import {
  Alert,
  AlertColor,
  Box,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import React, { useState } from "react";
import FormTambahUser from "./_client/FormTambahUser";
import { Pegawai } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function _Page({ listAtasan }: { listAtasan: Pegawai[] }) {
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
          <FormTambahUser
            listAtasan={listAtasan}
            onSubmit={async (data, reset) => {
              try {
                setIsLoading(true);
                const res = await axios({
                  url: "/api/user",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data,
                });
                reset();
                setSnackbar((oldV) => ({
                  ...oldV,
                  isOpen: true,
                  message: "User berhasil ditambah",
                  severity: "success",
                }));
              } catch (error) {
                setSnackbar((oldV) => ({
                  ...oldV,
                  isOpen: true,
                  message: "Gagal menambahkan user",
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
    </>
  );
}
