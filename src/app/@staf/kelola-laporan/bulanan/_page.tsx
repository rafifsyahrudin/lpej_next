"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import { getMonthName } from "@/utils/month-name";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import RepeatIcon from "@mui/icons-material/RepeatOnOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import {
  Laporan,
  LaporanBulanan,
  Pegawai,
  Prisma,
  Status,
  StatusLaporanBulanan,
} from "@prisma/client";
import { Document, Page } from "react-pdf";
import Link from "next/link";
import moment from "moment";

const StatusIcon = ({ status }: { status: Status }) => {
  switch (status) {
    case "MENUNGGU":
      return (
        <TimelineDot color="warning">
          <HourglassTopIcon />
        </TimelineDot>
      );
    case "DITOLAK":
      return (
        <TimelineDot color="error">
          <ClearIcon />
        </TimelineDot>
      );
    case "DITERIMA":
      return (
        <TimelineDot color="success">
          <CheckIcon />
        </TimelineDot>
      );
  }
};

export default function _Page({
  laporanBulanan,
}: {
  laporanBulanan: (LaporanBulanan & {
    laporan: Laporan[];
    pegawai: Pegawai & { atasan: Pegawai | null };
    status: StatusLaporanBulanan[];
  })[];
}) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileLaporan, setFileLaporan] = useState<string>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Container
        sx={{
          my: 2,
        }}
      >
        <MyLoadingBox isLoading={isLoading}>
          <Box>
            <Link href="/kelola-laporan/bulanan/ajukan">
              <Button>Ajukan Laporan</Button>
            </Link>
            {laporanBulanan.map((laporan, i) => (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}bh-content`}
                  id={`panel${i}bh-header`}
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {moment(laporan.bulan).format("MMMM YYYY")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Timeline
                        position="alternate"
                        sx={{
                          [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.25,
                          },
                        }}
                      >
                        {laporan.status.map((s, i) => (
                          <TimelineItem key={i}>
                            <TimelineOppositeContent color="text.secondary">
                              <Typography>{s.tanggal.toString()}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineConnector
                              // sx={{ bgcolor: "secondary.main" }}
                              />
                              <StatusIcon status={s.status} />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography>{s.status}</Typography>
                              <Typography>{s.pesan}</Typography>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justifyContent="center"
                      display="flex"
                    >
                      {/* <Button
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
                      )} */}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </MyLoadingBox>
      </Container>
    </>
  );
}
