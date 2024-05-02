"use client";
import { SetStateAction, useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { ImageComponent } from "./imageComponent";
import { ItemData } from "./item";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export const Products = () => {
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
  const [originalProducts, setOriginalProducts] = useState<
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
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [phrase, setPhrase] = useState<string>("");
  useEffect(() => {
    setIsloading(true);
    fetch(`${DOMAIN}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (res) => {
      const allData = await res.json();
      setProducts(allData.slice(0, 200));
      setOriginalProducts(allData.slice(0, 200));
      setIsloading(false);
    });
  }, [value]);

  const handleClick = () => {
    if (phrase) {
      let filtered = originalProducts?.filter((product) =>
        product.product_name?.toLowerCase().includes(phrase.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(originalProducts);
    }
  };
  return (
    <>
      <h1 style={{ fontSize: "36px" }}>Collection Categories</h1>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div style={{}}>
          <input
            value={phrase}
            onChange={(event) => setPhrase(event.target.value)}
            type="text"
            placeholder="Search products..."
          />
          <button
            style={{ border: "1px solid black", cursor: "pointer" }}
            onClick={handleClick}
          >
            Search
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: " center",
            }}
          >
            {value === 0 &&
              products &&
              products.map((product: any, index) => {
                return (
                  <ItemData
                    id={product._id}
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
      )}
    </>
  );
};
