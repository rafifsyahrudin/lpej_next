import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
  const admin = await prisma.pegawai.create({
    data: {
      nip: "0",
      nama: "admin",
      jabatan: "admin",
      unitKerja: "admin",
      user: {
        create: {
          role: Role.Admin,
          password: bcrypt.hashSync("admin", 10),
        },
      },
    },
  });

  return NextResponse.json(admin);
}
