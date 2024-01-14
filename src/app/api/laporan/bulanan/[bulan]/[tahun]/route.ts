import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { Status, StatusLaporanBulanan } from "@prisma/client";
import moment from "moment";

export async function GET(
  req: NextRequest,
  { params }: { params: { bulan: string; tahun: string } }
) {
  const pegawaiId = req.nextUrl.searchParams.get("pegawaiId");

  if (!pegawaiId) {
    return NextResponse.json(
      {
        message: "query 'pegawaiId' required",
      },
      { status: 400 }
    );
  }

  const foundLaporanBulanan = await prisma.laporanBulanan.findFirst({
    where: {
      bulan: {
        gte: new Date(Number(params.tahun), Number(params.bulan), 1),
        lte: new Date(Number(params.tahun), Number(params.bulan), 31),
      },
      pegawaiId: {
        equals: Number(pegawaiId),
      },
    },
    include: {
      laporan: true,
      status: true,
    },
  });

  return NextResponse.json(foundLaporanBulanan);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { bulan: string; tahun: string } }
) {
  const pegawaiId = req.nextUrl.searchParams.get("pegawaiId");

  if (!pegawaiId) {
    return NextResponse.json(
      {
        message: "query 'pegawaiId' required",
      },
      { status: 400 }
    );
  }

  const laporan = await prisma.laporan.findMany({
    where: {
      pegawaiId: Number(pegawaiId),
      tanggal: {
        gte: new Date(Number(params.tahun), Number(params.bulan), 1),
        lte: new Date(Number(params.tahun), Number(params.bulan), 31),
      },
    },
  });

  const createdLaporanBulanan = await prisma.laporanBulanan.create({
    data: {
      pegawaiId: Number(pegawaiId),
      bulan: new Date(Number(params.tahun), Number(params.bulan)),
      status: {
        create: {
          status: Status.MENUNGGU,
          tanggal: moment().toISOString(true),
          pesan: "Laporan Sedang direview..",
        },
      },
    },
  });

  await prisma.laporanBulanan.update({
    where: {
      id: createdLaporanBulanan.id,
    },
    data: {
      laporan: {
        connect: laporan,
      },
    },
  });

  return NextResponse.json(createdLaporanBulanan, {
    status: 201,
  });
}
