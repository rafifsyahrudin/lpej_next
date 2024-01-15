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
import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarOrigin,
  Stack,
} from "@mui/material";
import MyLoadingBox from "@/app/_components/MyLoadingBox";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const r = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<
    { isOpen: boolean; message: string; severity?: AlertColor } & SnackbarOrigin
  >({
    vertical: "top",
    horizontal: "center",
    isOpen: false,
    message: "",
  });
  const { register, handleSubmit } = useForm<TFormSignIn>();
  const onSubmit = async (data: TFormSignIn) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      if (res?.error) {
        setSnackbar((oldV) => ({
          ...oldV,
          isOpen: true,
          message: "NIP atau password salah!",
          severity: "error",
        }));
      } else {
        setSnackbar((oldV) => ({
          ...oldV,
          isOpen: true,
          message: "Login berhasil",
          severity: "success",
        }));
        r.replace("/");
        r.refresh();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${Bg})`,
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar
          anchorOrigin={{
            vertical: snackbar.vertical,
            horizontal: snackbar.horizontal,
          }}
          open={snackbar.isOpen}
          onClose={() => {
            setSnackbar({
              ...snackbar,
              isOpen: false,
            });
          }}
          key={snackbar.horizontal + snackbar.vertical}
        >
          <Alert
            onClose={() => {
              setSnackbar({
                ...snackbar,
                isOpen: false,
              });
            }}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
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
          <MyLoadingBox isLoading={isLoading}>
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
          </MyLoadingBox>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}
