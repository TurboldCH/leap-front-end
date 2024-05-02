"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DOMAIN = process.env.NEXT_PUBLIC_URL;

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const router = useRouter();
  const body: any = {
    email: email,
    password: password,
  };
  const login = async () => {
    try {
      if (!email || !password) {
        alert("Email or passing is missing");
      } else {
        await fetch(`${DOMAIN}/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then(async (res) => {
          const { token, refreshToken, userEmail } = await res.json();
          if (res.status !== 200) {
            alert(res.statusText);
          } else {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userEmail", userEmail);
            router.push("/");
          }
        });
      }
    } catch (error) {
      alert("FAILED TO FETCH");
      console.log(error);
    }
    return false;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "liteblue" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => {
                  setEmail(event?.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event?.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link href="/forgot-password-email" variant="body2">
                    Thru e-mail?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    Register
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //     gap: "20px",
    //     padding: "50px",
    //     height: "100vh",
    //   }}
    // >
    //   <h1 style={{ fontWeight: "500" }}>LOGIN</h1>
    //   <TextField
    //     id="standard-basic"
    //     label="Enter Email"
    //     style={{ width: "250px" }}
    //     variant="standard"
    //     onChange={(event) => {
    //       setEmail(event?.target.value);
    //     }}
    //   />
    //   <TextField
    //     id="outlined-password-input"
    //     label="Password"
    //     type="password"
    //     style={{ width: "250px" }}
    //     autoComplete="current-password"
    //     onChange={(event) => {
    //       setPassword(event?.target.value);
    //     }}
    //   />
    //   <a
    //     href="/register"
    //     style={{
    //       textDecoration: "underline",
    //       textDecorationColor: "gray",
    //     }}
    //   >
    //     Register
    //   </a>
    //   <a
    //     href="/forgot-password"
    //     style={{
    //       textDecoration: "underline",
    //       textDecorationColor: "gray",
    //     }}
    //   >
    //     Forgot Password
    //   </a>
    //   <a
    //     href="/forgot-password-email"
    //     style={{
    //       textDecoration: "underline",
    //       textDecorationColor: "gray",
    //     }}
    //   >
    //     Forgot Password Thru Email
    //   </a>
    //   <Button style={{ width: "200px" }} variant="outlined" onClick={login}>
    //     Enter
    //   </Button>
    // </div>
  );
}
