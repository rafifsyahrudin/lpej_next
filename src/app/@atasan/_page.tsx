"use client";

import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Dashboard from "../_common/Dashboard";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";

import { Pegawai } from "@prisma/client";

export default function _Page({
  nama,
  staf,
}: {
  nama: string;
  staf: Pegawai[];
}) {
  return (
    <>
      <Container
        sx={{
          mt: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item>
            <Card>
              <CardContent>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography color="text.secondary" variant="overline">
                      Anggota Staf
                    </Typography>
                    <Typography variant="h4">{staf.length}</Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      backgroundColor: "primary.main",
                      height: 48,
                      width: 48,
                    }}
                  >
                    <SvgIcon>
                      <FormatListBulleted />
                    </SvgIcon>
                  </Avatar>
                </Stack>
                {/* {true && (
                  <Stack alignItems="end" spacing={2} sx={{ mt: 2 }}>
                    <Typography
                      color="text.secondary"
                      variant="caption"
                      textAlign="end"
                    >
                      Sejak tahun terakhir
                    </Typography>
                  </Stack>
                )} */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Dashboard nama={nama} />
          </Grid>
        </Grid>
      </Container>

      <Dashboard nama={nama} />
    </>
  );
}
