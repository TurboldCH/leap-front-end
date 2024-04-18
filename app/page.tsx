"use client";
import { Box, Button, Tab, Tabs, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import Typography from "@mui/material/Typography";
import { Delete } from "./components/delete";
import { Products } from "./components/products";
import { Category } from "./components/category";
import { CategoryByID } from "./components/categoryByID";
import { Post } from "./components/post";
import { Update } from "./components/update";
import { useRouter } from "next/navigation";
const DOMAIN = process.env.DOMAIN;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const URLS = {
  Products: "/products",
  Category: "/products/Shoes",
  CategoryID: "/products/electronics/10",
  DeleteCategoryID: "/products/:category/:id",
  Post: "/products/createItem",
  Update: "/products/:category/:id",
};
export default function Home() {
  const [value, setValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const callProtected = async () => {
    try {
      const res = await fetch(`${DOMAIN}/protected`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status !== 200) {
        const refresh = await fetch(`${DOMAIN}/refresh`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
        });
        if (refresh.status !== 200) {
          router.push("/login");
        } else {
          const refreshToken = await refresh.json();
          localStorage.setItem("token", refreshToken);
          setLoggedIn(true);
        }
      }
    } catch (error) {
      router.push("/login");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      setLoggedIn(false);
      router.push("/login");
    } else {
      callProtected();
    }
  }, [loggedIn]);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div style={{ display: "flex", gap: "15px" }}>
        <a
          href="/register"
          style={{
            textDecoration: "underline",
            textDecorationColor: "gray",
          }}
        >
          Register
        </a>
        {loggedIn === false ? (
          <button
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              alert("Logging Out...");
              router.push("/login");
            }}
            style={{
              textDecoration: "underline",
              textDecorationColor: "gray",
            }}
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            style={{
              textDecoration: "underline",
              textDecorationColor: "gray",
            }}
          >
            Login
          </a>
        )}
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            {Object.keys(URLS).map((url, index) => {
              return <Tab label={url} value={index} key={index} />;
            })}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Products />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Category />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CategoryByID />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Delete />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Post />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <Update />
        </CustomTabPanel>
      </Box>
    </main>
  );
}
