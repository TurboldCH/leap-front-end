"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const DOMAIN = process.env.DOMAIN;
export default function ForgotPassword() {
  const [email, setEmail] = useState<String>();
  const router = useRouter();

  const forgot = async () => {
    try {
      if (!email) {
        alert("Please enter email");
      } else {
        await fetch(`${DOMAIN}/forgot-password"`, {
          method: "post",
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
      <h1 style={{ fontWeight: "500" }}>FORGOT PASSWORD</h1>
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
  );
}
