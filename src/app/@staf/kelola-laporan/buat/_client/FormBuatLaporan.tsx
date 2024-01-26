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
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import {
  Controller,
  UseFormRegister,
  UseFormReset,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  UploadDropzone,
  UploadDropzoneConfig,
} from "@bytescale/upload-widget-react";
import { LaporanBulanan, LaporanFoto } from "@prisma/client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";

export type TFormBuatLaporan = {
  tanggal: string;
  lokasi: string;
  kegiatan: string;
  rincianKegiatan: string;
  foto: Pick<LaporanFoto, "path">[];
};

export default function FormBuatLaporan({
  laporanBulananPegawai,
  onSubmit,
}: {
  laporanBulananPegawai: LaporanBulanan[];
  onSubmit: (
    data: { laporan: TFormBuatLaporan[]; bulan: string },
    reset: () => void
  ) => void;
}) {
  const [periodeLaporan, setPeriodeLaporan] = useState<Moment>();
  const [usedDate, setUsedDate] = useState<Set<number>>(new Set());
  const { register, control, handleSubmit, watch, reset, setValue, getValues } =
    useForm<{
      data: TFormBuatLaporan[];
    }>({
      values: {
        data: [],
      },
    });
  const { fields, remove, append, update } = useFieldArray({
    name: "data",
    control,
  });
  useMemo(() => {
    setValue(
      "data",
      getValues("data").map((v) => {
        if (!v.tanggal) {
          return {
            ...v,
            tanggal: moment(periodeLaporan).date(1).format("MM/DD/YYYY"),
          };
        }

        if (!periodeLaporan) {
          return v;
        }

        return {
          ...v,
          tanggal: moment(v.tanggal)
            .month(periodeLaporan.month())
            .year(periodeLaporan.year())
            .format("MM/DD/YYYY"),
        };
      })
    );
  }, [periodeLaporan]);

  const handleBuatLaporan = async ({ data }: { data: TFormBuatLaporan[] }) => {
    if (!periodeLaporan) {
      return;
    }

    onSubmit(
      {
        bulan: periodeLaporan.format("MM/DD/YYYY"),
        laporan: data,
      },
      () => {
        setUsedDate(new Set());
        setPeriodeLaporan(undefined);
        reset();
      }
    );
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(handleBuatLaporan)}>
        <Box
          sx={{
            mb: 2,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label={"Periode Laporan"}
              views={["month", "year"]}
              value={periodeLaporan}
              onChange={(m) => {
                if (m) setPeriodeLaporan(m);
              }}
              shouldDisableMonth={(m) =>
                laporanBulananPegawai
                  .map((lb) => moment(lb.bulan).format("MM YYYY"))
                  .includes(m.format("MM YYYY"))
              }
            />
          </LocalizationProvider>
        </Box>
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
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <Controller
                        control={control}
                        name={`data.${i}.tanggal`}
                        render={({ field }) => (
                          <DatePicker
                            value={moment(field.value)}
                            inputRef={field.ref}
                            disabled={!periodeLaporan}
                            onChange={(date) => {
                              if (date) {
                                field.onChange(date.format("MM/DD/YYYY"));
                                setUsedDate((oldV) => {
                                  const newUsedDate = new Set(oldV);
                                  newUsedDate.delete(
                                    moment(field.value).date()
                                  );
                                  newUsedDate.add(date.date());
                                  return newUsedDate;
                                });
                              }
                            }}
                            slots={{
                              calendarHeader: () => null,
                            }}
                            slotProps={{
                              textField: {
                                InputProps: {
                                  readOnly: true,
                                },
                              },
                            }}
                            shouldDisableMonth={(m) => {
                              return m.month() !== periodeLaporan?.month();
                            }}
                            shouldDisableDate={(m) => {
                              return usedDate.has(m.date());
                            }}
                            // views={["day"]}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>Lokasi</InputLabel>
                    <TextField
                      id="lokasi"
                      variant="outlined"
                      fullWidth
                      required
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
                tanggal: moment(periodeLaporan).format("MM/DD/YYYY"),
                lokasi: "",
                kegiatan: "",
                rincianKegiatan: "",
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
