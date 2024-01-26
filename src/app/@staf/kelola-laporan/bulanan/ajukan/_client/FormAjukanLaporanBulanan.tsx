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
import { ReactNode, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Session } from "next-auth";
import { stat } from "fs";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import { useRouter } from "next/navigation";
import { laporanBulananScheme } from "@/utils/zod-schemes";
import { MyNavContext } from "@/app/_components/MyNav";

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
    switch (status[status.length - 1].status) {
      case "MENUNGGU":
        return <Typography color="warning.main">Laporan Terkirim</Typography>;
      case "DITERIMA":
        return <Typography color="success.main">Laporan Diterima</Typography>;
      case "DITOLAK":
        return <Typography color="error.main">Laporan Ditolak</Typography>;
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
  const r = useRouter();
  const { register, handleSubmit } = useForm<TFormAjukanLaporanBulanan>();
  const [laporanBulanan, setLaporanBulanan] = useState<
    | (LaporanBulanan & { laporan: Laporan[]; status: StatusLaporanBulanan[] })
    | null
  >(null);
  const [bulanLaporan, setBulanLaporan] = useState<Moment>(moment());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useContext(MyNavContext);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios({
          url: `/api/laporan/bulanan/${bulanLaporan.month()}/${bulanLaporan.year()}?pegawaiId=${
            session.user.id
          }`,
          method: "GET",
        });

        const dataLaporanBulanan = z
          .nullable(laporanBulananScheme)
          .parse(res.data);
        setLaporanBulanan(() => dataLaporanBulanan);
      } catch (error) {
        setSnackbar((oldV) => ({
          ...oldV,
          isOpen: true,
          severity: "error",
          message: "Gagal memuat data",
        }));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [bulanLaporan, session.user.id, setSnackbar]);

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
        <MyLoadingBox isLoading={isLoading}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={"Periode Laporan"}
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
            {laporanBulanan && (
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
                    r.refresh();
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
                        {moment(l.tanggal).format("dddd, DD MMMM YYYY")}
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
