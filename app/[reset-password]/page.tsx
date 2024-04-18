"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DOMAIN = process.env.DOMAIN;
export default function Page() {
  const [password, setPassword] = useState<String>();
  const [confirm, setConfirm] = useState<String>();
  const searchParam = useSearchParams();
  const router = useRouter();
  const token = searchParam.get("token");
  const id = searchParam.get("id");
  const body: any = { token: token, userID: id, resetPassword: confirm };

  const reset = async () => {
    try {
      if (password !== confirm) {
        alert("Passwords don't match");
      } else {
        await fetch(`${DOMAIN}"/reset-password"` + `/${id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then(async (res) => {
          const response = await res.json();
          if (res.status !== 200) {
            return alert(response);
          } else {
            router.push("/login");
            return alert(response);
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
      <h1 style={{ fontWeight: "500" }}>RESET PASSWORD</h1>
      <TextField
        id="outlined-password-input"
        label="Enter new password"
        style={{ width: "250px" }}
        type="password"
        autoComplete="current-password"
        onChange={(event) => {
          setPassword(event?.target.value);
        }}
      />
      <TextField
        id="outlined-password-input"
        label="Confirm new password"
        style={{ width: "250px" }}
        type="password"
        autoComplete="current-password"
        onChange={(event) => {
          setConfirm(event?.target.value);
        }}
      />
      <Button style={{ width: "200px" }} variant="outlined" onClick={reset}>
        Enter
      </Button>
    </div>
  );
}
