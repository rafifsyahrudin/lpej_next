import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { LaporanBulanan } from "@prisma/client";

export async function POST(req: NextRequest) {
  const reqData = (await req.json()) as Pick<
    LaporanBulanan,
    "bulan" | "path"
  > & { pegawaiId: string };

  const createdLaporanBulanan = await prisma.laporanBulanan.create({
    data: {
      pegawaiId: Number(reqData.pegawaiId),
      bulan: reqData.bulan,
      path: reqData.path,
    },
  });

  return NextResponse.json(createdLaporanBulanan, {
    status: 201,
  });
}

export async function GET(req: NextRequest) {
  const atasanId = req.nextUrl.searchParams.get("atasanId");

  const laporanBulananStaf = await prisma.laporanBulanan.findMany({
    where: {
      pegawai: {
        atasanId: Number(atasanId),
      },
    },
    include: {
      pegawai: true,
      laporan: true,
    },
  });

  return NextResponse.json(laporanBulananStaf);
}
