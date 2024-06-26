"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export const Delete = () => {
  const [deleteItem, setDeleteItem] = useState();
  const [category, setCategory] = useState();
  const [deleteID, setDeleteID] = useState<String>();
  const deleteFunction = async (event: React.SyntheticEvent) => {
    if (category === undefined || category === "") {
      alert("Select Category");
    } else if (deleteID === undefined || deleteID === "") {
      alert("Item ID is missing");
    } else {
      fetch(`${DOMAIN}/products/${category}/${deleteID}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(async (res) => {
        const data = await res.json();
        setDeleteItem(data);
      });
    }
  };
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Delete Item</h1>
      <div style={{ display: "flex", paddingBottom: "20px", gap: "10px" }}>
        <select
          id="dropdown"
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
          variant="standard"
          style={{ width: "250px" }}
          onChange={(event) => {
            setDeleteID(event?.target.value);
          }}
        />
        <Button
          style={{ width: "200px" }}
          variant="outlined"
          onClick={deleteFunction}
        >
          Enter
        </Button>
      </div>
      {deleteItem &&
        (typeof deleteItem === "string" ? (
          <div>{deleteItem}</div>
        ) : (
          <div>Item Deleted Successfully!</div>
        ))}
    </>
  );
};
