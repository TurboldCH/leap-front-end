"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const DOMAIN = process.env.NEXT_PUBLIC_URL;
export default function ForgotPassword() {
  const [email, setEmail] = useState<String>();
  const router = useRouter();

  const forgot = async () => {
    try {
      if (!email) {
        alert("Please enter email");
      } else {
        await fetch(`${DOMAIN}/forgot-password`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }).then(async (res) => {
          if (res.status !== 200) {
            alert("User Doesn't Exist");
          } else {
            const response = await res.json();
            router.push(response);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          padding: "50px",
          height: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "liteblue" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <TextField
          id="standard-basic"
          label="Enter Email"
          style={{ width: "250px" }}
          variant="standard"
          onChange={(event) => {
            setEmail(event?.target.value);
          }}
        />
        <a
          href="/login"
          style={{
            textDecoration: "underline",
            textDecorationColor: "gray",
          }}
        >
          Login
        </a>
        <Button style={{ width: "200px" }} variant="outlined" onClick={forgot}>
          Enter
        </Button>
      </div>
    </ThemeProvider>
  );
}
