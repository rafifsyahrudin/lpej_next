"use client";

import React from "react";
import { PieChart, BarChart } from "@mui/x-charts";
import { Paper } from "@mui/material";

export default function SectionDashboard() {
  return (
    <Paper
      sx={{
        mt: 2,
      }}
    >
      <BarChart
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
          { data: [60, 50, 15, 25] },
        ]}
        height={290}
        xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />

      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Staf" },
              { id: 1, value: 15, label: "Atasan" },
              { id: 2, value: 20, label: "Laporan" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </Paper>
  );
}
