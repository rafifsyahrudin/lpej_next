"use client";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Laporan } from "@prisma/client";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 200 },
  { field: "tanggal", headerName: "Tanggal", width: 200 },
  { field: "kegiatan", headerName: "Kegiatan", width: 200 },
  { field: "lokasi", headerName: "Lokasi", width: 200 },
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

export default function TableRekapLaporan({ laporan }: { laporan: Laporan[] }) {
  return (
    <DataGrid
      rows={laporan}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
}
