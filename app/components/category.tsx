"use client";
import { ReactNode, useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { ImageComponent } from "./imageComponent";
import { ItemData } from "./item";

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
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState();
  const handleSelectChange = (event: { target: { value: any } }) => {
    setCategory(event.target.value);
    // displayCategory();
  };
  useEffect(() => {
    setIsLoading(true);
    if (!category) {
      return;
    }
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
      setIsLoading(false);
    });
  }, [category]);
  return (
    <>
      <div style={{ display: "flex", paddingBottom: "20px", gap: "10px" }}>
        <h1 style={{ fontSize: "36px" }}>Select Category</h1>
        <select
          id="dropdown"
          name="dropdown"
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
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: " center",
          }}
        >
          {products &&
            products.map((product: any, index) => {
              return (
                <ItemData
                  key={index}
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
      )}
    </>
  );
};
