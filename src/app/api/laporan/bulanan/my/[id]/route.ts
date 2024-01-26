import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function GET(req: NextRequest) {
  const pegawaiId = req.nextUrl.searchParams.get("pegawaiId");
  const foundlaporanBulanan = await prisma.laporanBulanan.findMany({
    where: {
      pegawaiId: Number(pegawaiId),
    },
  });

  return NextResponse.json(foundlaporanBulanan);
}
