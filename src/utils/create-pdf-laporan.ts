import axios from "axios";
import moment from "moment";
import { Laporan, LaporanBulanan, Pegawai } from "@prisma/client";

type TResponseBuildReport = {
  task_id: string;
  status: string;
};

export async function createPdfLaporan(
  laporanBulanan: LaporanBulanan & {
    laporan: Laporan[];
    pegawai: Pegawai & { atasan: Pegawai | null };
  }
): Promise<TResponseBuildReport> {
  const res = await axios<TResponseBuildReport>({
    url: "https://api.hybiscus.dev/api/v1/build-report",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "P-H_NsTfhLotwj6QIZ2Z9EZ11dhgpJITbEDW8dg3mj4",
    },
    data: {
      type: "Report",
      options: {
        report_title: `Laporan`,
        report_byline: moment(laporanBulanan.bulan).format("MMMM YYYY"),
      },
      components: [
        {
          type: "Section",
          options: {
            section_title: `Detail Kegiatan Selama Bulan ${moment(
              laporanBulanan.bulan
            ).format("MMMM")}`,
            columns: 1,
          },
          components: [
            {
              type: "Table",
              options: {
                headings: ["Tanggal", "Kegiatan", "Lokasi"],
                rows: laporanBulanan.laporan
                  .map((l) => {
                    return {
                      tanggal: moment(l.tanggal).format("DD MMMM YYYY"),
                      kegiatan: l.kegiatan,
                      lokasi: l.lokasi,
                    };
                  })
                  .map((l) => Object.values(l)),
              },
            },
            {
              type: "Section",
              options: {
                section_title: `Mengetahui`,
                vertical_margin: 16,
                columns: 1,
                width: "1/3",
              },
              components: [
                {
                  type: "Row",
                  options: {
                    columns: 1,
                    width: "1/2",
                  },
                  components: [
                    {
                      type: "Image",
                      options: {
                        image_url:
                          "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg",
                        enable_border: false,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  return res.data;
}
