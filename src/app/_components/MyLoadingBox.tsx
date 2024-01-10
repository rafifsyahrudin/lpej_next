"use client";

import { Paper, LinearProgress, Box } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";

export default function MyLoadingBox({
  children,
  isLoading,
}: PropsWithChildren<{ isLoading: boolean }>) {
  return (
    <>
      <Paper
        sx={{
          position: "relative",
          p: 2,
        }}
      >
        {isLoading && (
          <LinearProgress
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          />
        )}
        <Box
          sx={{
            ...(isLoading && {
              pointerEvents: "none",
              opacity: 0.5,
            }),
          }}
        >
          {children}
        </Box>
      </Paper>
    </>
  );
}
