{
  /* <Button
                        onClick={async () => {
                          try {
                            setIsLoading(true);
                            const res = await axios({
                              url: "https://api.hybiscus.dev/api/v1/build-report",
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                "X-API-KEY":
                                  "P-H_NsTfhLotwj6QIZ2Z9EZ11dhgpJITbEDW8dg3mj4",
                              },
                              data: {
                                type: "Report",
                                options: {
                                  report_title: `Rekap Laporan`,
                                  report_byline: `${getMonthName(
                                    laporan.bulan.getMonth()
                                  )} ${new Date().getFullYear()}`,
                                  version_number: "0.1b",
                                },
                                components: [
                                  {
                                    type: "Section",
                                    options: {
                                      section_title: `Detail Kegiatan Selama Bulan ${getMonthName(
                                        laporan.bulan.getMonth()
                                      )}`,
                                      columns: 1,
                                    },
                                    components: [
                                      {
                                        type: "Table",
                                        options: {
                                          headings: [
                                            "Id",
                                            "Tanggal",
                                            "Kegiatan",
                                            "Lokasi",
                                          ],
                                          rows: laporan.laporan
                                            .map((l) => {
                                              const d = new Date(l.tanggal);
                                              return {
                                                id: l.id,
                                                tanggal: `${d.getDay()} ${getMonthName(
                                                  d.getMonth()
                                                )} ${d.getFullYear()}`,
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
                                            type: "Image",
                                            options: {
                                              image_url:
                                                "https://cdn0-production-images-kly.akamaized.net/1ucWVqIhwahtIQcEGq56fGcIFcI=/500x281/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2749927/original/015147500_1552456045-4.jpg",
                                              caption:
                                                laporan.pegawai.atasan?.nama,
                                              enable_border: false,
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            });
                            console.log(res);
                            await axios({
                              url: "/api/laporan/bulanan",
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              data: {
                                pegawaiId: laporan.pegawai.id,
                                bulan: new Date(new Date().getFullYear(), i),
                                path: res.data.task_id,
                              },
                            });
                          } catch (error) {
                            console.log(error);
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                      >
                        Generate Laporan
                      </Button>
                      <Button
                        onClick={async () => {
                          const res = await axios({
                            url: `/api/laporan/bulanan/${i}?pegawaiId=${laporan.pegawai.id}`,
                            method: "GET",
                          });

                          setFileLaporan(res.data[0].path);
                        }}
                      >
                        Load Laporan
                      </Button>
                      {fileLaporan && (
                        <Document file={fileLaporan}>
                          <Page pageNumber={1} />
                        </Document>
                      )} */
}
