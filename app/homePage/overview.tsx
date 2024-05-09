"use client";

import { useEffect, useState } from "react";
import { ItemData } from "../components/item";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export const Overview = (category: any) => {
  const [products, setProducts] = useState<
    {
      _id: string;
      product_name: string;
      brand: string;
      price: string;
      description: string;
      release_date: string;
      size: string;
      color: string;
    }[]
  >();
  useEffect(() => {
    fetch(`${DOMAIN}/products/${category.category}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      setProducts(data.slice(0, 5));
    });
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "50px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          display: "flex",
          textTransform: "uppercase",
          fontWeight: "400",
          color: "#333",
          fontSize: "19px",
          fontFamily: "Franziska, Georgia, Cambria",
        }}
      >
        {category.category}
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1640px",
          padding: "20px 0px 20px 350px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: "50px",
          border: "14px ridge #f99090",
        }}
      >
        {products &&
          products.map((product: any) => {
            return (
              <ItemData
                key={product._id}
                itemID={product._id}
                name={product.product_name}
                brand={product.brand}
                price={product.price}
                description={product.description}
                release_date={product.release_date}
                size={product.size}
                color={product.color}
              />
            );
          })}
      </div>
    </div>
  );
};
