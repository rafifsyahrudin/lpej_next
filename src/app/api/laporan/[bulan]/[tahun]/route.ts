import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { bulan: string; tahun: string } }
) {
  const foundLaporanBulanan = await prisma.laporan.findMany({
    where: {
      tanggal: {
        gte: new Date(Number(params.tahun), Number(params.bulan), 1),
        lte: new Date(Number(params.tahun), Number(params.bulan), 31),
      },
    },
  });

  return NextResponse.json(foundLaporanBulanan);
}
