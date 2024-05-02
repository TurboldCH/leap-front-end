"use client";
import { Button, TextField } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { ItemData } from "./item";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export const CategoryByID = () => {
  const [products, setProducts] = useState<{
    _id: string;
    product_name: string;
    brand: string;
    price: string;
    description: string;
    release_date: string;
    size: string;
    color: string;
  }>();
  const [category, setCategory] = useState();
  const [itemID, setItemID] = useState<String>();
  const findItem = async () => {
    if (category == undefined) {
      alert("Select Category");
    }
    if (itemID == undefined || itemID == "") {
      alert("Item ID is missing");
    } else {
      await fetch(`${DOMAIN}/products/${category}/${itemID}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(async (res) => {
        const data = await res.json();
        setProducts(data);
      });
    }
  };
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Full Item Description</h1>
      <div style={{ display: "flex", paddingBottom: "20px", gap: "10px" }}>
        <select
          id="dropdown"
          style={{
            background: "none",
            border: "1px solid #2196F3",
            color: "#2196F3",
          }}
          onChange={(event: { target: { value: any } }) => {
            setCategory(event?.target.value);
          }}
          value={category}
        >
          <option value="">Select...</option>
          <option value="Shoes">Shoes</option>
          <option value="beauty">Beauty</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="home-decor">Home-decor</option>
          <option value="sports">Sports</option>
        </select>
        <TextField
          id="standard-basic"
          label="Enter Item ID"
          style={{ width: "250px" }}
          variant="standard"
          onChange={(event) => {
            setItemID(event?.target.value);
          }}
        />
        <Button
          style={{ width: "200px" }}
          variant="outlined"
          onClick={findItem}
        >
          Enter
        </Button>
      </div>
      {products &&
        (typeof products === "string" ? (
          <div>{products}</div>
        ) : (
          <ItemData
            id={products._id}
            name={products.product_name}
            brand={products.brand}
            price={products.price}
            description={products.description}
            release_date={products.release_date}
            size={products.size}
            color={products.color}
          />
        ))}
    </>
  );
};
