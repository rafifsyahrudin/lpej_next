import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { TFormBuatLaporan } from "@/app/laporan/buat/_client/FormBuatLaporan";

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

  const laporan: Prisma.LaporanCreateManyInput[] = reqBody.map((l) => ({
    ...l,
    tanggal: new Date(l.tanggal).toISOString(),
    pegawaiId: Number(session.user.id),
  }));

  const result = await prisma.laporan.createMany({
    data: laporan,
  });

  return NextResponse.json(result);
}
