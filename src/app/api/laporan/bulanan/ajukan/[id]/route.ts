import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { Status } from "@prisma/client";
import moment from "moment";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const diajukanLaporanBulanan = await prisma.laporanBulanan.update({
    where: {
      id: Number(params.id),
    },
    data: {
      status: {
        create: {
          status: Status.MENUNGGU,
          tanggal: moment().toISOString(true),
          pesan: "Laporan Sedang direview..",
        },
      },
    },
  });

  return NextResponse.json(diajukanLaporanBulanan);
}
