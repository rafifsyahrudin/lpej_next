"use client";

import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Dashboard from "../_common/Dashboard";
import { difference } from "next/dist/build/utils";
import CurrencyIcon from "@mui/icons-material/CurrencyBitcoin";
import ArrowUpIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import ListItemIcon from "@mui/icons-material/FormatListBulleted";
import ArrowDownIcon from "@mui/icons-material/ArrowDownward";
import { ClearIcon } from "@mui/x-date-pickers";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import { LaporanBulanan, StatusLaporanBulanan } from "@prisma/client";

export default function _Page({
  nama,
  laporanBulanan,
}: {
  nama: string;
  laporanBulanan: (LaporanBulanan & { status: StatusLaporanBulanan[] })[];
}) {
  const ditolak = laporanBulanan.filter((l) =>
    l.status.find((s) => s.status === "DITOLAK")
  );
  const diterima = laporanBulanan.filter((l) =>
    l.status.find((s) => s.status === "DITERIMA")
  );
  return (
    <>
      <Container
        sx={{
          mt: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item>
            <Card>
              <CardContent>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography color="text.secondary" variant="overline">
                      Laporan Bulanan
                    </Typography>
                    <Typography variant="h4">
                      {laporanBulanan.length}
                    </Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      backgroundColor: "primary.main",
                      height: 48,
                      width: 48,
                    }}
                  >
                    <SvgIcon>
                      <FormatListBulleted />
                    </SvgIcon>
                  </Avatar>
                </Stack>
                {/* {true && (
                  <Stack alignItems="end" spacing={2} sx={{ mt: 2 }}>
                    <Typography
                      color="text.secondary"
                      variant="caption"
                      textAlign="end"
                    >
                      Sejak tahun terakhir
                    </Typography>
                  </Stack>
                )} */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography color="text.secondary" variant="overline">
                      Laporan Dikirim
                    </Typography>
                    <Typography variant="h4">{diterima.length}</Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      backgroundColor: "warning.main",
                      height: 48,
                      width: 48,
                    }}
                  >
                    <SvgIcon>
                      <SendIcon />
                    </SvgIcon>
                  </Avatar>
                </Stack>
                {/* {true && (
                  <Stack alignItems="end" spacing={2} sx={{ mt: 2 }}>
                    <Typography
                      color="text.secondary"
                      variant="caption"
                      textAlign="end"
                    >
                      Sejak tahun terakhir
                    </Typography>
                  </Stack>
                )} */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography color="text.secondary" variant="overline">
                      Laporan Diterima
                    </Typography>
                    <Typography variant="h4">{diterima.length}</Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      backgroundColor: "success.main",
                      height: 48,
                      width: 48,
                    }}
                  >
                    <SvgIcon>
                      <CheckIcon />
                    </SvgIcon>
                  </Avatar>
                </Stack>
                {/* {true && (
                  <Stack alignItems="end" spacing={2} sx={{ mt: 2 }}>
                    <Typography
                      color="text.secondary"
                      variant="caption"
                      textAlign="end"
                    >
                      Sejak tahun terakhir
                    </Typography>
                  </Stack>
                )} */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography color="text.secondary" variant="overline">
                      Laporan Ditolak
                    </Typography>
                    <Typography variant="h4">{ditolak.length}</Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      backgroundColor: "error.main",
                      height: 48,
                      width: 48,
                    }}
                  >
                    <SvgIcon>
                      <ClearIcon />
                    </SvgIcon>
                  </Avatar>
                </Stack>
                {/* {true && (
                  <Stack alignItems="end" spacing={2} sx={{ mt: 2 }}>
                    <Typography
                      color="text.secondary"
                      variant="caption"
                      textAlign="end"
                    >
                      Sejak tahun terakhir
                    </Typography>
                  </Stack>
                )} */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Dashboard nama={nama} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
