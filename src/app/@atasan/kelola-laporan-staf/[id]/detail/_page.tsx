"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Document, Page, pdfjs } from "react-pdf";
import {
  LaporanBulanan,
  Pegawai,
  StatusLaporanBulanan,
  Laporan,
  LaporanFoto,
  Status,
  $Enums,
} from "@prisma/client";
import {
  Alert,
  AlertColor,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import { getMonthName } from "@/utils/month-name";
import { createPdfLaporan } from "@/utils/create-pdf-laporan";
import { jsPDF } from "jspdf";
import { MyNavContext } from "@/app/_components/MyNav";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `pdfjs-dist/build/pdf.worker.min.js`,
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Row({
  i,
  laporan,
}: {
  i: number;
  laporan: Laporan & { foto: LaporanFoto[] };
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {++i}
        </TableCell>
        <TableCell align="right">{laporan.kegiatan}</TableCell>
        <TableCell align="right">
          {moment(laporan.tanggal).format("DD MMMM YYYY")}
        </TableCell>
        <TableCell align="right">{laporan.lokasi}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                p: 2,
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5">
                    {laporan.rincianKegiatan}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ImageList cols={7} rowHeight={100} gap={12}>
                    {laporan.foto.map((f) => (
                      <ImageListItem key={f.id}>
                        <Box
                          component="img"
                          sx={{
                            objectFit: "cover",
                          }}
                          src={f.path}
                          alt="kegiatan laporan"
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function _Page({
  laporanBulanan,
}: {
  laporanBulanan: LaporanBulanan & {
    pegawai: Pegawai & { atasan: Pegawai | null };
    status: StatusLaporanBulanan[];
    laporan: (Laporan & { foto: LaporanFoto[] })[];
  };
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = React.useContext(MyNavContext);
  const [dialogAksi, setDialogAksi] = React.useState<{
    isOpen: boolean;
    aksi: "DITERIMA" | "DITOLAK";
  }>({
    isOpen: false,
    aksi: "DITERIMA",
  });
  const { register, handleSubmit, reset } = useForm<{ pesan: string }>({
    defaultValues: {
      pesan: "",
    },
  });
  const [fileLaporan, setFileLaporan] = useState<string | null>(null);
  const ref = React.createRef<HTMLDivElement>();
  const r = useRouter();
  const handleClickOpen = (aksi: "DITOLAK" | "DITERIMA") => {
    setDialogAksi((oldV) => ({ ...oldV, isOpen: true, aksi }));
  };

  const handleClose = () => {
    setDialogAksi((oldV) => ({ ...oldV, isOpen: false }));
  };

  return (
    <>
      <Container
        sx={{
          mt: 2,
        }}
      >
        <Dialog
          open={dialogAksi.isOpen}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit(async (data) => {
              try {
                setIsLoading(true);
                const res = await axios({
                  url: `/api/laporan/bulanan/update-status/${laporanBulanan.id}`,
                  method: "POST",
                  data: {
                    status: dialogAksi.aksi,
                    pesan: data.pesan,
                  },
                });
                setSnackbar((oldV) => ({
                  ...oldV,
                  isOpen: true,
                  message: "Berhasil",
                  severity: "success",
                }));
              } catch (error) {
                setSnackbar((oldV) => ({
                  ...oldV,
                  isOpen: true,
                  message: "Gagal",
                  severity: "error",
                }));
              } finally {
                reset();
                handleClose();
                r.replace("/kelola-laporan-staf");
              }
            }),
            sx: ({ palette }) => ({
              minWidth: 500,
              outline: "2px",
              outlineStyle: "solid",
              outlineColor:
                dialogAksi.aksi === "DITERIMA"
                  ? palette.success.main
                  : palette.error.main,
            }),
          }}
        >
          <DialogTitle>
            {dialogAksi.aksi === "DITERIMA"
              ? "Terima Laporan"
              : "Tolak Laporan"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Pesan</DialogContentText>
            <TextField
              autoFocus
              id="pesan"
              variant="outlined"
              minRows={3}
              multiline
              fullWidth
              {...register("pesan")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
        <MyLoadingBox isLoading={isLoading}>
          <Paper
            component="div"
            ref={ref}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              component="div"
              sx={{
                mb: 2,
              }}
            >
              <Grid item xs={6}>
                <Typography variant="h4">
                  {laporanBulanan.pegawai.nama}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {`${laporanBulanan.pegawai.unitKerja} - ${laporanBulanan.pegawai.jabatan}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  textAlign: "end",
                }}
              >
                <Typography>
                  {`Laporan Periode ${moment(laporanBulanan.bulan).format(
                    "MMMM YYYY"
                  )}`}
                </Typography>
              </Grid>
            </Grid>

            {laporanBulanan.status[laporanBulanan.status.length - 1].status ===
              "MENUNGGU" && (
              <ButtonGroup
                size="large"
                aria-label="large button group"
                sx={{
                  m: "auto",
                }}
              >
                <Button
                  key="terima"
                  color="success"
                  onClick={() => {
                    handleClickOpen("DITERIMA");
                  }}
                >
                  Terima
                </Button>
                ,
                <Button
                  key="tolak"
                  color="error"
                  onClick={() => {
                    handleClickOpen("DITOLAK");
                  }}
                >
                  Tolak
                </Button>
                ,
              </ButtonGroup>
            )}

            <Paper
              sx={{
                maxHeight: 400,
                overflow: "auto",
                m: 4,
              }}
            >
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>No.</TableCell>
                      <TableCell>Kegiatan</TableCell>
                      <TableCell align="right">Tanggal</TableCell>
                      <TableCell align="right">Lokasi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {laporanBulanan.laporan.map((laporan, i) => (
                      <Row key={laporan.id} i={i} laporan={laporan} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {laporanBulanan.status.filter((s) => s.status === "DITERIMA")
              .length > 0 && (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  my: 2,
                }}
              >
                <Button
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      const resPdf = await axios({
                        method: "POST",
                        url: "https://us1.pdfgeneratorapi.com/api/v4/documents/generate",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxZDFiNzRlMzM2MTMxNjI2NjIyYTkyNzdiYTVkZDNhYzhkOGYxYzExOTY0OTIzMDQ5Mjc1ZDI1ZjQ3NzUxZjNkIiwic3ViIjoidGdjZml0cmFoMjZAZ21haWwuY29tIiwiZXhwIjoxNzA2MjU0Mjc0fQ.CFTu4ytnPTZveafVb2yUylUTFi8IxvbAzv06lz2WSAU",
                        },
                        data: {
                          template: {
                            id: "947567",
                            data: [
                              {
                                periode_laporan: moment(
                                  laporanBulanan.bulan
                                ).format("MMMM YYYY"),
                                nama: laporanBulanan.pegawai.nama,
                                jabatan: laporanBulanan.pegawai.jabatan,
                                unit_kerja: laporanBulanan.pegawai.unitKerja,
                                nama_atasan:
                                  laporanBulanan.pegawai.atasan?.nama,
                                line_items: laporanBulanan.laporan.map((l) => ({
                                  tanggal: moment(l.tanggal).format(
                                    "DDDD MMMM YYYY"
                                  ),
                                  kegiatan: l.kegiatan,
                                  rincian_kegiatan: l.rincianKegiatan,
                                  image_1: l.foto.length > 0 ? l.foto[0] : null,
                                })),
                              },
                            ],
                          },
                          format: "pdf",
                          output: "url",
                          name: "laporan",
                        },
                      });
                      setFileLaporan(resPdf.data.response);
                      const resUpdatePdf = await axios({
                        method: "PUT",
                        url: `/api/laporan/bulanan/update-pdf/${laporanBulanan.id}`,
                        data: {
                          path: resPdf.data.response,
                        },
                      });
                      console.log(resUpdatePdf);
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  Generate Laporan
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      const res = await axios({
                        url: `/api/laporan/bulanan/get/${laporanBulanan.id}`,
                        method: "GET",
                      });
                      setFileLaporan(res.data.path);
                    } catch (error) {
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  Load Laporan
                </Button>
              </Stack>
            )}

            {fileLaporan && (
              <Box
                component="iframe"
                src={fileLaporan}
                sx={{
                  width: "100%",
                  minHeight: 750,
                }}
              />
            )}
          </Paper>
        </MyLoadingBox>
      </Container>
    </>
  );
}
