"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Session } from "next-auth";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckIcon from "@mui/icons-material/Check";
import {
  Laporan,
  LaporanBulanan,
  Pegawai,
  Status,
  StatusLaporanBulanan,
} from "@prisma/client";
import moment from "moment";
import { getMonthName } from "@/utils/month-name";

const columns: GridColDef[] = [
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    valueGetter: (params) =>
      params.row.status[params.row.status.length - 1].status,
    renderCell: ({ value }) => {
      switch (value) {
        case Status.MENUNGGU:
          return (
            <Chip label={value} color="warning" icon={<HourglassTopIcon />} />
          );
        case Status.DITOLAK:
          return <Chip label={value} color="error" icon={<ClearIcon />} />;
        case Status.DITERIMA:
          return <Chip label={value} color="success" icon={<DoneIcon />} />;
      }
    },
  },
  {
    field: "namaPegawai",
    headerName: "Nama Pegawai",
    flex: 1,
    valueGetter: (params) => params.row.pegawai.nama,
  },
  {
    field: "jabatanPegawai",
    headerName: "Jabatan Pegawai",
    valueGetter: (params) => params.row.pegawai.jabatan,
    flex: 1,
  },
  {
    field: "laporanBulan",
    headerName: "Periode Laporan",
    valueFormatter: (params) => moment(params.value).format("MMMM YYYY"),
    valueGetter: (params) => moment(params.row.bulan),
    flex: 1,
  },
  {
    field: "aksi",
    headerName: "Aksi",
    renderCell: ({ row }) => {
      return (
        <Button
          variant="outlined"
          href={`/kelola-laporan-staf/${row.id}/detail`}
        >
          Lihat Laporan
        </Button>
      );
    },
    flex: 1,
  },
];

export default function _Page({
  laporanBulananStaf,
}: {
  laporanBulananStaf: (LaporanBulanan & {
    pegawai: Pegawai;
    status: StatusLaporanBulanan[];
  })[];
}) {
  return (
    <Container
      sx={{
        mt: 2,
      }}
    >
      <Paper>
        <DataGrid
          rows={laporanBulananStaf}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
}
