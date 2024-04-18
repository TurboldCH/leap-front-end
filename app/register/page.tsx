"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
const DOMAIN = process.env.DOMAIN;
export default function Register() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const router = useRouter();
  const body: any = {
    email: email,
    password: password,
  };
  const register = async () => {
    try {
      if (!email || !password) {
        alert("Email or password is missing");
      } else {
        await fetch(`${DOMAIN}/register`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then(async (res) => {
          if (res.status !== 200) {
            const { message } = await res.json();
            alert(message);
          } else {
            alert("Registered");
            const { token, refreshToken } = await res.json();
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            router.push("/login");
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
      <h1 style={{ fontWeight: "500" }}>REGISTER</h1>
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
        style={{ width: "250px" }}
        type="password"
        autoComplete="current-password"
        onChange={(event) => {
          setPassword(event?.target.value);
        }}
      />
      <Button style={{ width: "200px" }} variant="outlined" onClick={register}>
        Enter
      </Button>
    </div>
  );
}
