"use client";

import {
  Container,
  Box,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/AddOutlined";
import React from "react";
import { Pegawai, User } from "@prisma/client";

export default function _Page({
  users,
}: {
  users: (User & { pegawai: (Pegawai & { atasan: Pegawai | null }) | null })[];
}) {
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
          <Link href="/kelola-user/tambah">
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
              {users.map((user) => (
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
