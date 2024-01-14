"use client";

import {
  Alert,
  AlertColor,
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import SendIcon from "@mui/icons-material/SendOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmptyOutlined";
import {
  Laporan,
  LaporanBulanan,
  Status,
  StatusLaporanBulanan,
} from "@prisma/client";
import axios from "axios";
import moment, { Moment } from "moment";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Session } from "next-auth";
import { stat } from "fs";
import MyLoadingBox from "@/app/_components/MyLoadingBox";

export type TFormAjukanLaporanBulanan = {
  bulan: Date;
};

const StatusIcon = ({ status }: { status: Status }): ReactNode => {
  switch (status) {
    case "MENUNGGU":
      return <HourglassEmptyIcon />;
    case "DITERIMA":
      return <CheckIcon />;
    default:
      return <CloseIcon />;
  }
};

const ButtonKirimLaporan = ({
  status,
  onClick,
}: {
  status: StatusLaporanBulanan[];
  onClick: () => void;
}) => {
  if (status.length > 0) {
    if (status[status.length - 1].status === "MENUNGGU") {
      return <Button>Laporan Terkirim!</Button>;
    }
  }

  return (
    <IconButton aria-label="send" onClick={onClick}>
      <SendIcon />
    </IconButton>
  );
};

export default function FormAjukanLaporanBulanan({
  session,
}: {
  session: Session;
}) {
  const { register, handleSubmit } = useForm<TFormAjukanLaporanBulanan>();
  const [laporanBulanan, setLaporanBulanan] = useState<
    | (LaporanBulanan & { laporan: Laporan[]; status: StatusLaporanBulanan[] })
    | null
  >(null);
  const [bulanLaporan, setBulanLaporan] = useState<Moment>(moment());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<
    { isOpen: boolean; message: string; severity?: AlertColor } & SnackbarOrigin
  >({
    vertical: "top",
    horizontal: "center",
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `/api/laporan/bulanan/${bulanLaporan.month()}/${bulanLaporan.year()}?pegawaiId=${
          session.user.id
        }`,
        method: "GET",
      });

      const laporanScheme = z.object({
        id: z.coerce.number(),
        tanggal: z.coerce.date(),
        kegiatan: z.string(),
        rincianKegiatan: z.string().nullable(),
        lokasi: z.string(),
        pegawaiId: z.coerce.number(),
        laporanBulananId: z.coerce.number().nullable(),
      });
      const statusLaporanBulananScheme = z.object({
        id: z.coerce.number(),
        tanggal: z.coerce.date(),
        status: z.nativeEnum(Status),
        pesan: z.string().nullable(),
        laporanBulananId: z.coerce.number(),
      });
      const laporanBulananScheme = z.object({
        id: z.coerce.number(),
        bulan: z.coerce.date(),
        path: z.string().nullable(),
        pegawaiId: z.coerce.number(),
        laporan: z.array(laporanScheme),
        status: z.array(statusLaporanBulananScheme),
      });
      const dataLaporanBulanan = z
        .nullable(laporanBulananScheme)
        .parse(res.data);
      setLaporanBulanan(() => dataLaporanBulanan);
    })();
  }, [bulanLaporan, session.user.id]);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          my: 2,
          p: 2,
          outline: "solid 1px black",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={"Bulan Laporan"}
                views={["month", "year"]}
                value={bulanLaporan}
                onChange={(v) => {
                  if (v) {
                    setBulanLaporan((oldV) => v);
                  }
                }}
                sx={{
                  mb: 2,
                }}
              />
            </LocalizationProvider>
            {laporanBulanan?.status && (
              <ButtonKirimLaporan
                status={laporanBulanan.status}
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const res = await axios({
                      url: `/api/laporan/bulanan/ajukan/${laporanBulanan.id}`,
                      method: "POST",
                    });
                    setSnackbar((oldV) => ({
                      ...oldV,
                      isOpen: true,
                      message: "Berhasil mengajukan laporan",
                      severity: "success",
                    }));
                  } catch (error) {
                    setSnackbar((oldV) => ({
                      ...oldV,
                      isOpen: true,
                      message: "Gagal mengajukan laporan",
                      severity: "error",
                    }));
                  } finally {
                    setIsLoading(false);
                  }
                }}
              />
            )}
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Kegiatan</TableCell>
                  <TableCell>Rincian Kegiatan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {laporanBulanan ? (
                  laporanBulanan.laporan.map((l, i) => (
                    <TableRow key={l.id}>
                      <TableCell component="th">{i + 1}</TableCell>
                      <TableCell component="th">
                        {l.tanggal.toDateString()}
                      </TableCell>
                      <TableCell component="th">{l.kegiatan}</TableCell>
                      <TableCell component="th">{l.rincianKegiatan}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </MyLoadingBox>
      </Paper>
    </>
  );
}
