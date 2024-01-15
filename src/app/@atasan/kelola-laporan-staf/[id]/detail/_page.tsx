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
  TextField,
} from "@mui/material";
import moment from "moment";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import { getMonthName } from "@/utils/month-name";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `pdfjs-dist/build/pdf.worker.min.js`,
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

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
          {i}
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

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

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
  const [snackbar, setSnackbar] = useState<
    { isOpen: boolean; message: string; severity?: AlertColor } & SnackbarOrigin
  >({
    vertical: "top",
    horizontal: "center",
    isOpen: false,
    message: "",
  });
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
        </MyLoadingBox>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
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

            <Button
              onClick={async () => {
                try {
                  setIsLoading(true);
                  const resPdf = await axios({
                    url: "https://api.hybiscus.dev/api/v1/build-report",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "X-API-KEY":
                        "P-H_NsTfhLotwj6QIZ2Z9EZ11dhgpJITbEDW8dg3mj4",
                    },
                    data: {
                      type: "Report",
                      options: {
                        report_title: `Rekap Laporan`,
                        report_byline: `${getMonthName(
                          moment(laporanBulanan.bulan).month()
                        )} ${new Date().getFullYear()}`,
                        version_number: "0.1b",
                      },
                      components: [
                        {
                          type: "Section",
                          options: {
                            section_title: `Detail Kegiatan Selama Bulan ${getMonthName(
                              moment(laporanBulanan.bulan).month()
                            )}`,
                            columns: 1,
                          },
                          components: [
                            {
                              type: "Table",
                              options: {
                                headings: [
                                  "Id",
                                  "Tanggal",
                                  "Kegiatan",
                                  "Lokasi",
                                ],
                                rows: laporanBulanan.laporan
                                  .map((l) => {
                                    const d = moment(l.tanggal);
                                    return {
                                      id: l.id,
                                      tanggal: `${d.day()} ${getMonthName(
                                        d.month()
                                      )} ${d.year()}`,
                                      kegiatan: l.kegiatan,
                                      lokasi: l.lokasi,
                                    };
                                  })
                                  .map((l) => Object.values(l)),
                              },
                            },
                            {
                              type: "Section",
                              options: {
                                section_title: `Mengetahui`,
                                vertical_margin: 16,
                                columns: 1,
                                width: "1/3",
                              },
                              components: [
                                {
                                  type: "Image",
                                  width: "1/4",
                                  options: {
                                    image_url:
                                      "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg",
                                    caption:
                                      laporanBulanan.pegawai.atasan?.nama,
                                    enable_border: false,
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  });
                  const resUpdatedPdf = await axios({
                    url: `/api/laporan/bulanan/update-pdf/${laporanBulanan.id}`,
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    data: {
                      path: resPdf.data.task_id,
                    },
                  });
                  console.log(resPdf);
                  console.log(resUpdatedPdf);
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
          </Paper>

          {fileLaporan && (
            <Box
              component="iframe"
              src={`https://api.hybiscus.dev/api/v1/get-report?task_id=${fileLaporan}&api_key=P-H_NsTfhLotwj6QIZ2Z9EZ11dhgpJITbEDW8dg3mj4`}
              sx={{
                width: "100%",
                minHeight: 750,
              }}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}
