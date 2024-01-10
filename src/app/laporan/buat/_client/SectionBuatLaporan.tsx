"use client";

import { Box, Button, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import FormBuatLaporan, { TFormBuatLaporan } from "./FormBuatLaporan";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import axios from "axios";

export default function SectionBuatLaporan() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, control, handleSubmit, watch, reset } = useForm<{
    data: TFormBuatLaporan[];
  }>({
    values: {
      data: [
        {
          tanggal: "",
          lokasi: "",
          kegiatan: "",
          rincianKegiatan: "",
        },
      ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    name: "data",
    control,
  });
  const onSubmit = async ({ data }: { data: TFormBuatLaporan[] }) => {
    try {
      setIsLoading(true);
      const res = await axios({
        url: "/api/laporan",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
      console.log(res);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {fields.map((field, i) => (
                <FormBuatLaporan key={field.id} register={register} i={i} />
              ))}
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  mt: 2,
                }}
                onClick={() => {
                  append({
                    tanggal: "",
                    lokasi: "",
                    kegiatan: "Mendesain",
                    rincianKegiatan: "mendesain",
                  });
                }}
              >
                Tambah Laporan Lainnya
              </Button>
              <Button
                type="submit"
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  mt: 2,
                }}
              >
                Simpan
              </Button>
            </Stack>
          </Box>
        </MyLoadingBox>
      </Box>
    </>
  );
}
