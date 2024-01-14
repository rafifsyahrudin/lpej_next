"use client";

import { UploadDropzone } from "@bytescale/upload-widget-react";
import {
  Grid,
  InputLabel,
  TextField,
  InputAdornment,
  Container,
  Paper,
  ImageList,
  ImageListItem,
  Box,
  Alert,
  Snackbar,
  AlertColor,
  SnackbarOrigin,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Laporan, LaporanFoto } from "@prisma/client";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { register } from "module";
import moment from "moment";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import MyLoadingBox from "@/app/_components/MyLoadingBox";

export default function _Page({
  laporan,
}: {
  laporan: Laporan & { foto: LaporanFoto[] };
}) {
  const { register, handleSubmit } = useForm<
    Pick<Laporan, "lokasi" | "kegiatan" | "rincianKegiatan">
  >({
    defaultValues: {
      ...laporan,
    },
  });
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
      <Container
        sx={{
          mt: 2,
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
          <Paper
            sx={{
              p: 2,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit(async (data) => {
                try {
                  setIsLoading(true);
                  const res = await axios({
                    url: `/api/laporan/ubah/${laporan.id}`,
                    method: "PUT",
                    data,
                  });
                  setSnackbar((oldV) => ({
                    ...oldV,
                    isOpen: true,
                    message: "Laporan berhasil diubah",
                    severity: "success",
                  }));
                } catch (error) {
                  setSnackbar((oldV) => ({
                    ...oldV,
                    isOpen: true,
                    message: "Laporan gagal diubah",
                    severity: "error",
                  }));
                } finally {
                  setIsLoading(false);
                }
              })}
            >
              <Grid container spacing={2}>
                <Grid item container xs={6} alignContent="start" spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel>Lokasi</InputLabel>
                    <TextField
                      id="lokasi"
                      variant="outlined"
                      fullWidth
                      placeholder="Dinas Provinsi Sumatera Selatan ..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                      {...register("lokasi")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Kegiatan</InputLabel>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="kegiatan"
                      autoComplete="kegiatan"
                      placeholder="Peringatan hari batik nasional ..."
                      {...register("kegiatan")}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Rincian Kegiatan</InputLabel>
                  <TextField
                    id="rincianKegiaan"
                    variant="outlined"
                    minRows={5}
                    multiline
                    placeholder="Membuat desain ucapan selamat hari batik nasional ..."
                    fullWidth
                    {...register("rincianKegiatan")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ImageList cols={10} rowHeight={100} gap={4}>
                    {laporan.foto.map((f, i) => (
                      <ImageListItem key={i}>
                        <img src={f.path} alt="laporan" loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 4,
                  }}
                >
                  Ubah
                </Button>
              </Grid>
            </Box>
          </Paper>
        </MyLoadingBox>
      </Container>
    </>
  );
}
