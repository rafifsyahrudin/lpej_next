"use client";

import MyLoadingBox from "@/app/_components/MyLoadingBox";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Laporan, LaporanFoto } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function _Page({
  laporan,
}: {
  laporan: (Laporan & { foto: LaporanFoto[] })[];
}) {
  const r = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<
    { isOpen: boolean; message: string; severity?: AlertColor } & SnackbarOrigin
  >({
    vertical: "top",
    horizontal: "center",
    isOpen: false,
    message: "",
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", resizable: true, flex: 0.25 },
    {
      field: "tanggal",
      headerName: "Tanggal",
      resizable: true,
      valueGetter: ({ value }) => moment(value).format("DD MMMM YYYY"),
      flex: 1,
    },
    { field: "kegiatan", headerName: "Kegiatan", resizable: true, flex: 1 },
    { field: "lokasi", headerName: "Lokasi", resizable: true, flex: 1 },
    {
      field: "aksi",
      headerName: "Aksi",
      resizable: true,
      flex: 1,
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          sx={{
            width: "100%",
          }}
          spacing={2}
        >
          <Button
            href={`/kelola-laporan/${row.id}/detail`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            size="small"
            variant="outlined"
          >
            Detail
          </Button>
          <Button
            color="error"
            onClick={async (e) => {
              try {
                e.stopPropagation();
                setIsLoading(true);
                const res = await axios({
                  url: `/api/laporan/hapus/${row.id}`,
                  method: "POST",
                });
                setSnackbar((oldV) => ({
                  ...oldV,
                  isOpen: true,
                  message: "Laporan berhasil dihapus",
                  severity: "success",
                }));
                r.refresh();
              } catch (error) {
                setSnackbar((oldV) => ({
                  ...oldV,
                  isOpen: true,
                  message: "Laporan berhasil dihapus",
                  severity: "success",
                }));
                r.refresh();
              } finally {
                setIsLoading(false);
                r.refresh();
              }
            }}
            size="small"
            variant="outlined"
          >
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
  return (
    <Container
      sx={{
        mt: 2,
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
        <Paper>
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
        </Paper>
      </MyLoadingBox>
    </Container>
  );
}
