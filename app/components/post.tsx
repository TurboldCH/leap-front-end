"use client";
import { Button, TextField } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

export const Post = () => {
  const [productName, setProductName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [quantity, setQuantity] = useState<string>();
  const [brand, setBrand] = useState<string>();
  const [category, setCategory] = useState();
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<String>();
  const [date, setDate] = useState<string>();
  const [postData, setPostData] = useState<{
    product_name: string;
    brand: string;
    price: string;
    description: string;
    release_date: string;
    size: string;
    color: string;
    quantity_available: string;
    category: string;
  }>();
  const [missingFields, setMissingFields] = useState<String>();
  const postItem = async (event: React.SyntheticEvent) => {
    const body: any = {
      product_name: productName,
      description: description,
      price: price,
      quantity_available: quantity,
      brand: brand,
      category: category,
      color: color,
      size: size,
      release_date: date,
    };
    Object.keys(body)
      .filter((value: string) => {
        if (
          body[value] == null ||
          body[value] == undefined ||
          body[value] == ""
        ) {
          return true;
        }
        return false;
      })
      .map((value: string) => {
        delete body[value];
      });
    await fetch("http://localhost:1000/products/createItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      const data = await res.json();
      if (data.CreatedItem !== undefined) {
        setMissingFields("");
        setPostData(data.CreatedItem);
      }
      if (typeof data === "string") {
        setPostData(undefined);
        setMissingFields(data);
      }
    });
  };
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Create Item</h1>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Name"
            variant="standard"
            onChange={(event) => {
              setProductName(event?.target.value);
            }}
          />
          <TextField
            label="Description"
            variant="standard"
            onChange={(event) => {
              setDescription(event?.target.value);
            }}
          />
          <TextField
            label="Price"
            variant="standard"
            onChange={(event) => {
              setPrice(event?.target.value);
            }}
          />
          <TextField
            label="Quantity"
            variant="standard"
            onChange={(event) => {
              setQuantity(event?.target.value);
            }}
          />
          <TextField
            label="Brand"
            variant="standard"
            onChange={(event) => {
              setBrand(event?.target.value);
            }}
          />
          <select
            id="dropdown"
            style={{
              background: "none",
              border: "1px solid #2196F3",
              color: "#2196F3",
              height: "48px",
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
            label="Color"
            variant="standard"
            onChange={(event) => {
              setColor(event?.target.value);
            }}
          />
          <TextField
            label="Size"
            variant="standard"
            onChange={(event) => {
              setSize(event?.target.value);
            }}
          />
          <TextField
            label="Release Date"
            variant="standard"
            onChange={(event) => {
              setDate(event?.target.value);
            }}
          />
          <Button
            style={{ width: "200px" }}
            variant="outlined"
            onClick={postItem}
          >
            Enter
          </Button>
        </div>
        {missingFields && <div>Some fields are missing</div>}
        {postData && (
          <div
            style={{
              width: "200px",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <p>Product Name: {postData?.product_name}</p>
            <p>Description: {postData?.description}</p>
            <p>Price: {postData?.price}</p>
            <p>Quantity: {postData?.quantity_available}</p>
            <p>Brand: {postData?.brand}</p>
            <p>Category: {postData?.category}</p>
            <p>Color: {postData?.color}</p>
            <p>Size: {postData?.size}</p>
            <p>Release date: {postData?.release_date}</p>
          </div>
        )}
      </div>
    </>
  );
};
