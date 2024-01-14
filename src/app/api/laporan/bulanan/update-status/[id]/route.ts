import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { StatusLaporanBulanan } from "@prisma/client";
import moment from "moment";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; status: string } }
) {
  const reqData = (await req.json()) as Pick<
    StatusLaporanBulanan,
    "status" | "pesan"
  >;

  const updatedLaporanBulanan = await prisma.laporanBulanan.update({
    where: {
      id: Number(params.id),
    },
    data: {
      status: {
        create: {
          tanggal: moment().toISOString(true),
          status: reqData.status,
          pesan: reqData.pesan,
        },
      },
    },
  });

  return NextResponse.json(updatedLaporanBulanan);
}
