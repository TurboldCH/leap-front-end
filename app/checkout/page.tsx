"use client";
import { useContext, useEffect, useState } from "react";
import {
  ProductsContext,
  ProductsContextProvider,
} from "../components/productsContext";
import { ItemData } from "../components/item";
const DOMAIN = process.env.NEXT_PUBLIC_URL;

export default function Checkout() {
  const [productsInCart, setProductsInCart] = useState<any>([]);

  useEffect(() => {
    const storedValue =
      typeof window !== "undefined"
        ? window.localStorage.getItem("cart")
        : null;
    setProductsInCart(storedValue ? JSON.parse(storedValue) : []);
  }, []);
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    if (productsInCart) {
      const uniqueIDs = Array.from(new Set(productsInCart));
      uniqueIDs.map((item: any) => {
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
  }, [productsInCart]);

  const handleAddMore = (id: any) => {
    setProductsInCart((prev: any) => [...prev, id]);
    window.localStorage.setItem("cart", JSON.stringify(productsInCart));
  };
  const handleTakeLess = (id: any) => {
    const position = productsInCart.indexOf(id);
    if (position !== 1) {
      setProductsInCart((prev: any) => {
        return prev.filter((value: any, index: any) => index !== position);
      });
    }
    window.localStorage.setItem("cart", JSON.stringify(productsInCart));
  };

  let subTotal = 0;
  // if (productsInCart) {
  //   for (let id of productsInCart) {
  //     console.log(products.find((p: any) => p._id === id));
  //     const itemPrice = products.find((p: any) => p._id === id).price;
  //     subTotal += itemPrice;
  //   }
  // }
  let deliveryFee = 5;
  let total = subTotal + deliveryFee;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <button
        onClick={() => {
          if (productsInCart) {
            setProductsInCart([]);
            window.localStorage.setItem("cart", "");
          }
        }}
      >
        Empty Cart
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
        {products &&
          products.map((product: any) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={product._id}
              >
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
                <div className="bg-white">
                  <button
                    className="border border-emerald-500 px-2 rounded-l text-emerald-500"
                    onClick={() => handleTakeLess(product._id)}
                  >
                    -
                  </button>
                  <p className="px-2">
                    {
                      productsInCart.filter((id: any) => id === product._id)
                        .length
                    }
                  </p>
                  <button
                    className="bg-emerald-500 px-2 rounded-l text-white"
                    onClick={() => handleAddMore(product._id)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "600px" }}>
        <input
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
          type="email"
          placeholder="Your Name"
        />
        <input
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
          type="email"
          placeholder="Email address"
        />
        <input
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
          type="text"
          placeholder="Home Address"
        />
        <input
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
          type="text"
          placeholder="Phone Number"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "600px",
          gap: "10px",
        }}
      >
        <div className="flex bg-gray-100">
          <h3 className="grow font-bold text-black-500">Subtotal: </h3>
          <h3 className="font-bold">${subTotal}</h3>
        </div>
        <div className="flex bg-gray-100">
          <h3 className="grow font-bold text-black-500">Delivery: </h3>
          <h3 className="font-bold">${deliveryFee}</h3>
        </div>
        <div className="flex bg-gray-100 my-3 border-t-2 border-solid border-black-600">
          <h3 className="grow font-bold text-black-500">Total: </h3>
          <h3 className="font-bold">${total}</h3>
        </div>
      </div>
    </div>
  );
}
