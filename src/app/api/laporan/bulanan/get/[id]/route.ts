import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const foundLaporanBulanan = await prisma.laporanBulanan.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(foundLaporanBulanan);
}
