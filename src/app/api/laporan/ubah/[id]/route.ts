import { Laporan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const reqData = (await req.json()) as Pick<
    Laporan,
    "lokasi" | "kegiatan" | "rincianKegiatan"
  >;

  const updatedLaporan = await prisma.laporan.update({
    where: {
      id: Number(params.id),
    },
    data: {
      lokasi: reqData.lokasi,
      kegiatan: reqData.kegiatan,
      rincianKegiatan: reqData.rincianKegiatan,
    },
  });

  return NextResponse.json(updatedLaporan);
}
