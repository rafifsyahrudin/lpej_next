import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const foundAllUser = await prisma.user.findMany({
    include: {
      pegawai: {
        include: {
          atasan: true,
        },
      },
    },
    where: {
      pegawai: {
        atasanId: Number(session?.user.id),
      },
    },
  });

  return (
    <Container>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
        }}
      >
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
  );
}
