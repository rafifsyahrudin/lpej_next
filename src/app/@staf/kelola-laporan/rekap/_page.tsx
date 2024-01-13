"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Laporan, LaporanFoto } from "@prisma/client";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", resizable: true, flex: 1 },
  {
    field: "tanggal",
    headerName: "Tanggal",
    resizable: true,
    valueGetter: ({ value }) => value.toDateString(),
    flex: 1,
  },
  { field: "kegiatan", headerName: "Kegiatan", resizable: true, flex: 1 },
  { field: "lokasi", headerName: "Lokasi", resizable: true, flex: 1 },
  {
    field: "aksi",
    headerName: "Aksi",
    resizable: true,
    flex: 1,
    renderCell: () => (
      <Stack
        direction="row"
        sx={{
          width: "100%",
        }}
      >
        <Button size="small" variant="outlined">
          Detail
        </Button>
        <Button size="small" variant="outlined">
          Delete
        </Button>
      </Stack>
    ),
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

export default function _Page({
  laporan,
}: {
  laporan: (Laporan & { foto: LaporanFoto[] })[];
}) {
  return (
    <Container>
      <Box
        sx={{
          p: 2,
        }}
      >
        <DataGrid
          rows={laporan}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          getRowHeight={(p) => "auto"}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </Container>
  );
}
