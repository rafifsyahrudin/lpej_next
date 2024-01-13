"use client";

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import {
  UseFormRegister,
  UseFormReset,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  UploadDropzone,
  UploadDropzoneConfig,
} from "@bytescale/upload-widget-react";
import { LaporanFoto } from "@prisma/client";

export type TFormBuatLaporan = {
  tanggal: string;
  lokasi: string;
  kegiatan: string;
  rincianKegiatan: string;
  foto: Pick<LaporanFoto, "path">[];
};

export default function FormBuatLaporan({
  onSubmit,
}: {
  onSubmit: (
    data: TFormBuatLaporan[],
    reset: UseFormReset<{ data: TFormBuatLaporan[] }>
  ) => void;
}) {
  const { register, control, handleSubmit, watch, reset, setValue } = useForm<{
    data: TFormBuatLaporan[];
  }>({
    values: {
      data: [
        {
          tanggal: "",
          lokasi: "",
          kegiatan: "",
          rincianKegiatan: "",
          foto: [],
        },
      ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    name: "data",
    control,
  });
  const handleBuatLaporan = async ({ data }: { data: TFormBuatLaporan[] }) => {
    onSubmit(data, reset);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(handleBuatLaporan)}>
        <Stack spacing={2}>
          {fields.map((field, i) => (
            <Paper
              key={field.id}
              variant="outlined"
              sx={{
                p: 2,
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
                <Grid item xs={12}>
                  <UploadDropzone
                    options={{
                      apiKey: "public_kW15brZqsP4ggN5cedcqXwRYgxGg",
                      showFinishButton: false, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
                      showRemoveButton: false,
                      multi: true,
                      styles: {
                        colors: {
                          primary: "#377dff",
                        },
                      },
                      editor: {
                        images: {
                          allowResizeOnMove: false,
                          crop: false,
                          preview: true,
                        },
                      },
                    }}
                    width="100%"
                    height="200px"
                    onUpdate={(e) => {
                      if (e.uploadedFiles.length) {
                        setValue(
                          `data.${i}.foto`,
                          e.uploadedFiles.map((uf) => ({
                            path: uf.fileUrl,
                          }))
                        );
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
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
                foto: [],
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
    </>
  );
}
