"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Logo from "../../../../public/logo_bakohumas.png";
import Bg from "../../../../public/bg.jpg";
import Image from "next/image";
import { Stack } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Bakohumas Diskominfo Palembang
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

type TFormSignIn = {
  nip: string;
  password: string;
};

export default function FormSignIn() {
  const { register, handleSubmit } = useForm<TFormSignIn>();
  const onSubmit = async (data: TFormSignIn) => {
    const res = await signIn("credentials", {
      redirect: true,
      ...data,
    });

    console.log(res);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${Bg})`,
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              color: "primary.main",
              textAlign: "center",
              mb: 2,
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              E-LAPKIN
            </Typography>
            <Typography variant="h6">Laporan Kinerja Tenaga Ahli</Typography>
          </Stack>
          <Image src={Logo} width={100} height={100} alt="logo" />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            method="POST"
            action="/api/auth/callback/credentials"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nip"
              label="NIP"
              autoComplete="nip"
              autoFocus
              {...register("nip")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}
