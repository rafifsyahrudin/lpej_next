"use client";

import {
  Box,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import { UseFormRegister, useForm } from "react-hook-form";

export type TFormBuatLaporan = {
  tanggal: string;
  lokasi: string;
  kegiatan: string;
  rincianKegiatan: string;
};

export default function FormBuatLaporan({
  register,
  i,
}: {
  register: UseFormRegister<{ data: TFormBuatLaporan[] }>;
  i: number;
}) {
  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        {/* <LinearProgress
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        /> */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            // pointerEvents: "none",
            // opacity: 0.5,
          }}
        >
          <Grid container spacing={2}>
            <Grid item container xs={6} alignContent="start" spacing={2}>
              <Grid item xs={6}>
                <InputLabel>Tanggal</InputLabel>
                <TextField
                  id="tanggal"
                  type="date"
                  fullWidth
                  variant="outlined"
                  {...register(`data.${i}.tanggal`)}
                />
              </Grid>
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
                  {...register(`data.${i}.lokasi`)}
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
                  {...register(`data.${i}.kegiatan`)}
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
                {...register(`data.${i}.rincianKegiatan`)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
