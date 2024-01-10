"use client";

import {
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  LinearProgress,
  Box,
} from "@mui/material";
import { Pegawai, Role } from "@prisma/client";
import React, { useState } from "react";
import { UseFormReset, useForm } from "react-hook-form";
import axios from "axios";

export type TFormTambahUser = {
  role: Role;
  nip: string;
  nama: string;
  unitKerja: string;
  jabatan: string;
  password: string;
  atasanId: number;
};

export default function FormTambahUser({
  listAtasan,
  onSubmit,
}: {
  listAtasan: Pegawai[];
  onSubmit: (
    data: TFormTambahUser,
    reset: UseFormReset<TFormTambahUser>
  ) => void;
}) {
  const { watch, register, reset, handleSubmit } = useForm<TFormTambahUser>();
  const handleTambahPengguna = async (data: TFormTambahUser) => {
    onSubmit(data, reset);
  };

  return (
    <>
      <Box component="form" p={2} onSubmit={handleSubmit(handleTambahPengguna)}>
        <Typography variant="h6" gutterBottom mb={2}>
          Tambah User
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                id="role"
                label="Role"
                {...register("role")}
              >
                <MenuItem value={Role.Admin}>{Role.Admin}</MenuItem>
                <MenuItem value={Role.Atasan}>{Role.Atasan}</MenuItem>
                <MenuItem value={Role.Staf}>{Role.Staf}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("nip")}
              required
              id="nip"
              name="nip"
              label="NIP"
              fullWidth
              autoComplete="nip"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("nama")}
              required
              id="nama"
              name="nama"
              label="Nama"
              fullWidth
              autoComplete="nama"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("unitKerja")}
              required
              id="unitKerja"
              name="unitKerja"
              label="Unit Kerja"
              fullWidth
              autoComplete="unitKerja"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("jabatan")}
              required
              id="jabatan"
              name="jabatan"
              label="Jabatan"
              fullWidth
              autoComplete="jabatan"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...register("password")}
              required
              type="password"
              id="password"
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
            />
          </Grid>
          {watch("role") === Role.Staf && (
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="atasanId">Atasan</InputLabel>
                <Select
                  {...register("atasanId")}
                  labelId="atasanId"
                  id="atasanId"
                  label="Atasan"
                >
                  {listAtasan.map((atasan, i) => (
                    <MenuItem key={i} value={atasan.id}>
                      {atasan.nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} display="flex">
            <Button
              type="submit"
              variant="contained"
              sx={{
                ml: "auto",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
