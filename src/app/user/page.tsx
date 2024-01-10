import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import prisma from "@/config/prisma";
import Link from "next/link";

export default async function Page() {
  const foundAllUser = await prisma.user.findMany({
    include: {
      pegawai: {
        include: {
          atasan: true,
        },
      },
    },
  });

  return (
    <>
      <Container
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            marginY: 2,
            ml: "auto",
          }}
        >
          <Link href="/user/tambah">
            <Button variant="contained" startIcon={<AddIcon />}>
              Tambah User
            </Button>
          </Link>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NIP</TableCell>
                <TableCell align="right">Nama</TableCell>
                <TableCell align="right">Unit Kerja</TableCell>
                <TableCell align="right">Jabatan</TableCell>
                <TableCell align="right">Atasan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foundAllUser.map((user) => (
                <TableRow
                  key={user.pegawaiId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.pegawai?.nip}
                  </TableCell>
                  <TableCell align="right">{user.pegawai?.nama}</TableCell>
                  <TableCell align="right">{user.pegawai?.unitKerja}</TableCell>
                  <TableCell align="right">{user.pegawai?.jabatan}</TableCell>
                  <TableCell align="right">
                    {user.pegawai?.atasan ? user.pegawai.atasan.nama : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
