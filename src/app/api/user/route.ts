import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { TTambahUserForm } from "@/app/user/tambah/_client/FormTambahPengguna";

export async function POST(req: NextRequest) {
  const reqData = (await req.json()) as TTambahUserForm;

  const createdUser = await prisma.user.create({
    data: {
      role: reqData.role,
      password: bcrypt.hashSync(reqData.password, 10),
      pegawai: {
        create: {
          nip: reqData.nip,
          nama: reqData.nama,
          jabatan: reqData.jabatan,
          unitKerja: reqData.unitKerja,
          atasanId: reqData.atasanId,
        },
      },
    },
  });

  return NextResponse.json(createdUser, {
    status: 201,
  });
}

export async function GET(req: NextRequest) {
  const foundAllUsers = await prisma.user.findMany({
    include: {
      pegawai: true,
    },
  });

  return NextResponse.json(foundAllUsers);
}
