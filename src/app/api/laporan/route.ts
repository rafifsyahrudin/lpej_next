import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { TFormBuatLaporan } from "@/app/@staf/kelola-laporan/buat/_client/FormBuatLaporan";

export async function GET(req: NextRequest) {
  const foundAllLaporan = await prisma.laporan.findMany();

  return NextResponse.json(foundAllLaporan);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, {
      status: 401,
    });
  }

  const reqBody = (await req.json()) as TFormBuatLaporan[];

  const result = await prisma.$transaction(async (tx) => {
    for (const b of reqBody) {
      await tx.laporan.create({
        data: {
          tanggal: new Date(b.tanggal).toISOString(),
          lokasi: b.lokasi,
          kegiatan: b.kegiatan,
          rincianKegiatan: b.rincianKegiatan,
          pegawaiId: Number(session.user.id),
          foto: {
            createMany: {
              data: b.foto,
            },
          },
        },
      });
    }

    return reqBody;
  });

  return NextResponse.json(result);
}
