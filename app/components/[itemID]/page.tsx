"use client";

import { useEffect, useState } from "react";
import { ItemDetail } from "./itemDetails";
import Footer from "./footer";
import { ProductsContextProvider } from "../productsContext";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export default function Page({ params }: { params: any }) {
  const [products, setProducts] = useState<{
    product_name: string;
    brand: string;
    price: string;
    description: string;
    release_date: string;
    size: string;
    color: string;
  }>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/products/getItem/${params.itemID}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const jsonData = await response.json();
        setProducts(jsonData);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [params.itemID]);
  return (
    <ProductsContextProvider>
      <div>
        <ItemDetail
          itemID={params.itemID}
          name={products?.product_name}
          brand={products?.brand}
          price={products?.price}
          description={products?.description}
          releaseDate={products?.release_date}
          size={products?.size}
          color={products?.color}
        />
        <Footer />
      </div>
    </ProductsContextProvider>
  );
}
