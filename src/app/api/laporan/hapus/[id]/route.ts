import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const deletedLaporan = await prisma.laporan.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(deletedLaporan);
}
