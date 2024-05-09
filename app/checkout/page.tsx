"use client";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/productsContext";
import { ItemData } from "../components/item";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export default function Checkout() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const storedValue =
      typeof window !== "undefined"
        ? window.localStorage.getItem("cart")
        : null;
    setSelectedProducts(storedValue ? JSON.parse(storedValue) : []);
  }, []);
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    if (selectedProducts) {
      selectedProducts.map((item: any) => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${DOMAIN}/products/getItem/${item}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const jsonData = await response.json();
            setProducts((prev: any[]) => [...prev, jsonData]);
          } catch (error) {
            alert(error);
          }
        };
        fetchData();
      });
    }
  }, [selectedProducts]);

  return (
    <div>
      <button
        onClick={() => {
          setSelectedProducts([]);
          if (!selectedProducts) {
            localStorage.setItem("cart", "");
          }
        }}
      >
        Empty Cart
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
        {products &&
          products.map((product: any) => {
            return (
              <div key={product._id}>
                <ItemData
                  itemID={product._id}
                  name={product.product_name}
                  brand={product.brand}
                  price={product.price}
                  description={product.description}
                  release_date={product.release_date}
                  size={product.size}
                  color={product.color}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
