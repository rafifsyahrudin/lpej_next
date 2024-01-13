"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Session } from "next-auth";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import {
  Laporan,
  LaporanBulanan,
  Pegawai,
  StatusLaporanBulanan,
} from "@prisma/client";
import moment from "moment";
import { getMonthName } from "@/utils/month-name";

const columns: GridColDef[] = [
  { field: "status", headerName: "Status", flex: 1 },
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
    valueGetter: (params) =>
      `${getMonthName(moment(params.row.bulan).month())} ${moment(
        params.row.bulan
      ).year()}`,
    flex: 1,
  },
  {
    field: "action",
    headerName: "Aksi",
    renderCell: ({ row }) =>
      row.status === StatusLaporanBulanan.MENUNGGU ? (
        <Stack direction="row">
          <Tooltip title="Terima">
            <IconButton
              size="small"
              color="success"
              onClick={async () => {
                await axios({
                  url: `/api/laporan/bulanan/update-status/${row.id}/terima`,
                  method: "POST",
                });
              }}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tolak">
            <IconButton
              size="small"
              color="error"
              onClick={async () => {
                await axios({
                  url: `/api/laporan/bulanan/update-status/${row.id}/tolak`,
                  method: "POST",
                });
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Button>Lihat Laporan</Button>
      ),
    flex: 1,
  },
];

export default function _Page({ session }: { session: Session | null }) {
  const [laporanBulananStaf, setLaporanBulananStaf] = useState<
    (LaporanBulanan & { pegawai: Pegawai; laporan: Laporan[] })[]
  >([]);
  useEffect(() => {
    (async () => {
      const res = await axios<
        (LaporanBulanan & { pegawai: Pegawai; laporan: Laporan[] })[]
      >({
        url: `/api/laporan/bulanan?atasanId=${session?.user.id}`,
        method: "GET",
      });

      console.log(res.data);
      setLaporanBulananStaf(() => res.data);
    })();
  }, [session?.user.id]);

  return (
    <Paper
      sx={{
        mt: 2,
      }}
    >
      <DataGrid
        rows={laporanBulananStaf}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
