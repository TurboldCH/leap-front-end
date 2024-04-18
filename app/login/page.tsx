"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DOMAIN = process.env.DOMAIN;
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
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then(async (res) => {
          const { token, refreshToken, email } = await res.json();
          if (res.status !== 200) {
            alert(res.statusText);
          } else {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            router.push("/");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <h1 style={{ fontWeight: "500" }}>LOGIN</h1>
      <TextField
        id="standard-basic"
        label="Enter Email"
        style={{ width: "250px" }}
        variant="standard"
        onChange={(event) => {
          setEmail(event?.target.value);
        }}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        style={{ width: "250px" }}
        autoComplete="current-password"
        onChange={(event) => {
          setPassword(event?.target.value);
        }}
      />
      <a
        href="/register"
        style={{
          textDecoration: "underline",
          textDecorationColor: "gray",
        }}
      >
        Register
      </a>
      <a
        href="/forgot-password"
        style={{
          textDecoration: "underline",
          textDecorationColor: "gray",
        }}
      >
        Forgot Password
      </a>
      <a
        href="/forgot-password-email"
        style={{
          textDecoration: "underline",
          textDecorationColor: "gray",
        }}
      >
        Forgot Password Thru Email
      </a>
      <Button style={{ width: "200px" }} variant="outlined" onClick={login}>
        Enter
      </Button>
    </div>
  );
}
