import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { StatusLaporanBulanan } from "@prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; status: string } }
) {
  const updatedLaporanBulanan = await prisma.laporanBulanan.update({
    where: {
      id: Number(params.id),
    },
    data: {
      status: StatusLaporanBulanan.DITERIMA,
    },
  });

  return NextResponse.json(updatedLaporanBulanan);
}
