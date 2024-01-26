import { Status } from "@prisma/client";
import { z } from "zod";

export const laporanScheme = z.object({
  id: z.coerce.number(),
  tanggal: z.coerce.date(),
  kegiatan: z.string(),
  rincianKegiatan: z.string().nullable(),
  lokasi: z.string(),
  pegawaiId: z.coerce.number(),
  laporanBulananId: z.coerce.number().nullable(),
});

export const statusLaporanBulananScheme = z.object({
  id: z.coerce.number(),
  tanggal: z.coerce.date(),
  status: z.nativeEnum(Status),
  pesan: z.string().nullable(),
  laporanBulananId: z.coerce.number(),
});

export const laporanBulananScheme = z.object({
  id: z.coerce.number(),
  bulan: z.coerce.date(),
  path: z.string().nullable(),
  pegawaiId: z.coerce.number(),
  laporan: z.array(laporanScheme),
  status: z.array(statusLaporanBulananScheme),
});
