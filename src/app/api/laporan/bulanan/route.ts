import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import {
  Laporan,
  LaporanBulanan,
  LaporanFoto,
  Status,
  StatusLaporanBulanan,
} from "@prisma/client";
import moment from "moment";

export async function POST(req: NextRequest) {
  const reqData = (await req.json()) as Pick<
    LaporanBulanan,
    "bulan" | "pegawaiId" | "path"
  > & { laporan: (Laporan & { foto: LaporanFoto[] })[] };

  const createdLaporanBulanan = await prisma.laporanBulanan.create({
    data: {
      bulan: moment(reqData.bulan).toISOString(true),
      pegawaiId: reqData.pegawaiId,
      // status: {
      //   create: {
      //     tanggal: moment().toISOString(true),
      //     status: Status.MENUNGGU,
      //     pesan: "Laporan Sedang direview..",
      //   },
      // },
    },
  });

  reqData.laporan.forEach(async (l) => {
    await prisma.laporan.create({
      data: {
        tanggal: moment(l.tanggal).toISOString(true),
        lokasi: l.lokasi,
        kegiatan: l.kegiatan,
        rincianKegiatan: l.rincianKegiatan,
        laporanBulananId: createdLaporanBulanan.id,
        pegawaiId: reqData.pegawaiId,
        foto: {
          createMany: {
            data: l.foto,
          },
        },
      },
    });
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
