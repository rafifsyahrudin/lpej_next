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

  return (
    <>
      <Container
        sx={{
          my: 2,
        }}
      >
        <MyLoadingBox isLoading={isLoading}>
          <Box>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <Link href="/kelola-laporan/bulanan/ajukan">
                <Button variant="outlined" size="small">
                  Ajukan Laporan
                </Button>
              </Link>
            </Box>
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
                      <Timeline position="alternate">
                        {laporan.status.map((s, i) => (
                          <TimelineItem key={i}>
                            <TimelineOppositeContent color="text.secondary">
                              <Typography>
                                {moment(s.tanggal).format("DD MMMM YYYY")}
                              </Typography>
                              <Typography>
                                {moment(s.tanggal).format("HH:mm:ss")}
                              </Typography>
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
                    {laporan.path && (
                      <Grid item xs={12}>
                        <Box
                          component="iframe"
                          src={laporan.path}
                          sx={{
                            width: "100%",
                            minHeight: 750,
                          }}
                        />
                      </Grid>
                    )}
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
