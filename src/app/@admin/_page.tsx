"use client";

import React from "react";
import { PieChart, BarChart } from "@mui/x-charts";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import CurrencyIcon from "@mui/icons-material/CurrencyBitcoin";
import ArrowUpIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import ListItemIcon from "@mui/icons-material/FormatListBulleted";
import ArrowDownIcon from "@mui/icons-material/ArrowDownward";
import Dashboard from "../_common/Dashboard";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import { Laporan, LaporanBulanan, Pegawai, User } from "@prisma/client";

export default function _Page({
  laporanBulanan,
  pegawai,
}: {
  pegawai: (Pegawai & { user: User })[];
  laporanBulanan: LaporanBulanan[];
}) {
  const atasan = pegawai.filter((p) => p.user.role === "Atasan");
  const staf = pegawai.filter((p) => p.user.role === "Staf");
  return (
    <>
      <Box>
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
                        Pegawai Atasan
                      </Typography>
                      <Typography variant="h4">{atasan.length}</Typography>
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
                        Pegawai Staf
                      </Typography>
                      <Typography variant="h4">{staf.length}</Typography>
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
                        Laporan Bulanan Dibuat
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
          </Grid>
        </Container>
      </Box>
      <Dashboard nama="Admin" />
    </>
  );
}
