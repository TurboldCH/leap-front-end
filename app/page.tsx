"use client";
import {
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
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
import LinearProgress from "@mui/material/LinearProgress";
import { TabHeader } from "./navigation/tabHeader";
import { ScrollToTopButton } from "./scrollTop.tsx/ScrollTop";
import { ProductsContextProvider } from "./components/productsContext";

const DOMAIN = process.env.NEXT_PUBLIC_URL;

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
  DeleteByID: "/products/:category/:id",
  Post: "/products/createItem",
  Update: "/products/:category/:id",
};

const defaultTheme = createTheme();

export default function Home() {
  const [value, setValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>();
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  [];
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
    if (typeof window !== "undefined" && window.localStorage) {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (token === undefined) {
        setLoggedIn(false);
        router.push("/login");
      } else {
        if (localStorage.getItem("userEmail")) {
          setUserEmail(localStorage.getItem("userEmail") || "");
        }
        callProtected();
        setIsLoading(false);
      }
    }
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "600",
            fontSize: "24px",
          }}
        >
          WELCOME TO MY WEBSITE
        </h1>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <a
            href="homePage"
            style={{
              textDecoration: "underline",
              textDecorationColor: "gray",
            }}
          >
            Home Page
          </a>
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
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                onClick={() => {
                  setLoggedIn(false);
                  localStorage.removeItem("token");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("cart");
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
              {userEmail && <p>Logged in as {userEmail}</p>}
            </div>
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
          <Box
            sx={{
              width: "100%",
              borderBottom: 1,
              borderColor: "divider",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "100",
            }}
          >
            <div className="tabs">
              <div className="tabs-body">
                <TabHeader
                  data={Object.keys(URLS)}
                  click={handleChange}
                  activeId={value}
                />
              </div>
            </div>
          </Box>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <div>
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
            </div>
          )}
        </Box>
        <ScrollToTopButton />
      </main>
    </ThemeProvider>
  );
}
