"use client";

import {
  Box,
  Button,
  IconButton,
  Paper,
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
import { Laporan, LaporanBulanan, StatusLaporanBulanan } from "@prisma/client";
import axios from "axios";
import moment, { Moment } from "moment";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Session } from "next-auth";
import { stat } from "fs";

export type TFormAjukanLaporanBulanan = {
  bulan: Date;
};

const StatusIcon = ({
  status,
}: {
  status: StatusLaporanBulanan;
}): ReactNode => {
  switch (status) {
    case "MENUNGGU":
      return <HourglassEmptyIcon />;
    case "DITERIMA":
      return <CheckIcon />;
    default:
      return <CloseIcon />;
  }
};

export default function FormAjukanLaporanBulanan({
  session,
}: {
  session: Session | null;
}) {
  const { register, handleSubmit } = useForm<TFormAjukanLaporanBulanan>();
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const [laporanBulanan, setLaporanBulanan] = useState<LaporanBulanan | null>(
    null
  );
  const [bulanLaporan, setBulanLaporan] = useState<Moment>(moment());

  useEffect(() => {
    (async () => {
      const [resLaporan, resLaporanBulanan] = await Promise.all([
        axios<Laporan[]>({
          url: `/api/laporan/${bulanLaporan.month()}/${bulanLaporan.year()}`,
          method: "GET",
        }),
        axios<LaporanBulanan>({
          url: `/api/laporan/bulanan/${bulanLaporan.month()}/${bulanLaporan.year()}?pegawaiId=${
            session?.user.id
          }`,
          method: "GET",
        }),
      ]);
      const laporanScheme = z.object({
        id: z.coerce.number(),
        tanggal: z.coerce.date(),
        lokasi: z.string(),
        kegiatan: z.string(),
        pegawaiId: z.coerce.number(),
        rincianKegiatan: z.string().nullable(),
        laporanBulananId: z.coerce.number().nullable(),
      });
      const laporanBulananScheme = z.object({
        id: z.coerce.number(),
        bulan: z.coerce.date(),
        path: z.string().nullable(),
        pegawaiId: z.coerce.number(),
        status: z.nativeEnum(StatusLaporanBulanan).nullable(),
      });
      const dataLaporan = z.array(laporanScheme).parse(resLaporan.data);
      setLaporan(() => dataLaporan);
      const dataLaporanBulanan = z
        .nullable(laporanBulananScheme)
        .parse(resLaporanBulanan.data);
      setLaporanBulanan(() => dataLaporanBulanan);

      console.log(dataLaporanBulanan);
    })();
  }, [bulanLaporan, session?.user.id]);

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
          {!laporanBulanan
            ? laporan.length > 0 && (
                <IconButton
                  aria-label="send"
                  onClick={async () => {
                    const res = await axios({
                      url: `/api/laporan/bulanan/${bulanLaporan.month()}/${bulanLaporan.year()}?pegawaiId=${
                        session?.user.id
                      }`,
                      method: "POST",
                    });

                    console.log(res);
                  }}
                >
                  <SendIcon />
                </IconButton>
              )
            : laporanBulanan.status && (
                <Button
                  startIcon={<StatusIcon status={laporanBulanan.status} />}
                  color={(() => {
                    if (laporanBulanan.status === "MENUNGGU") {
                      return "warning";
                    } else if (laporanBulanan.status === "DITERIMA") {
                      return "success";
                    } else if (laporanBulanan.status === "DITOLAK") {
                      return "error";
                    } else {
                      return "primary";
                    }
                  })()}
                >
                  {laporanBulanan.status}
                </Button>
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
              {laporan.map((l, i) => (
                <TableRow key={l.id}>
                  <TableCell component="th">{i + 1}</TableCell>
                  <TableCell component="th">
                    {l.tanggal.toDateString()}
                  </TableCell>
                  <TableCell component="th">{l.kegiatan}</TableCell>
                  <TableCell component="th">{l.rincianKegiatan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
