"use client";
import { ReactNode, useEffect, useState } from "react";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export const Category = () => {
  const [products, setProducts] = useState<
    {
      product_name: string;
      brand: string;
      price: string;
      description: string;
      release_date: string;
      size: string;
      color: string;
    }[]
  >();
  const [category, setCategory] = useState();
  const handleSelectChange = (event: { target: { value: any } }) => {
    setCategory(event.target.value);
    // displayCategory();
  };
  useEffect(() => {
    fetch(`${DOMAIN}/products/${category}`, {
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
  }, [category]);
  return (
    <>
      <div style={{ display: "flex", paddingBottom: "20px", gap: "10px" }}>
        <h1 style={{ fontSize: "36px" }}>Select Category</h1>
        <select
          id="dropdown"
          style={{
            background: "none",
            border: "1px solid #2196F3",
            color: "#2196F3",
          }}
          onChange={handleSelectChange}
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5px",
          justifyContent: " center",
        }}
      >
        {products &&
          products.map((product: any, index) => {
            return (
              <div
                key={index}
                style={{ width: "200px", border: "1px solid", padding: "3px" }}
              >
                Product Name: {product.product_name}
                <br />
                Brand: {product.brand}
                <br />
                Price: ${product.price}
                <br />
                Description: {product.description}
                <br />
                Release Date: {product.release_date}
                <br />
                Size: {product.size} <br />
                Color: {product.color}
              </div>
            );
          })}
      </div>
    </>
  );
};
