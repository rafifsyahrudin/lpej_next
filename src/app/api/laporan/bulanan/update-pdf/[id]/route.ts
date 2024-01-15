import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { LaporanBulanan } from "@prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const reqData = (await req.json()) as Pick<LaporanBulanan, "path">;

  const updatedPdf = await prisma.laporanBulanan.update({
    where: {
      id: Number(params.id),
    },
    data: {
      path: reqData.path,
    },
  });

  return NextResponse.json(updatedPdf);
}
