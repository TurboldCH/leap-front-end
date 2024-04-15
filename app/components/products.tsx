"use client";
import { useEffect, useState } from "react";

export const Products = () => {
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
  const [value, setValue] = useState(0);
  useEffect(() => {
    fetch("http://localhost:1000/products", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      setProducts(data);
    });
  }, [value]);
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Collection Categories</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5px",
          justifyContent: " center",
        }}
      >
        {value === 0 &&
          products &&
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
