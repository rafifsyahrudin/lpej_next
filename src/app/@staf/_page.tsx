"use client";

import React from "react";
import { PieChart, BarChart } from "@mui/x-charts";
import { Paper } from "@mui/material";
import Dashboard from "../_common/Dashboard";

export default function _Page({ nama }: { nama: string }) {
  return <Dashboard nama={nama} />;
}
