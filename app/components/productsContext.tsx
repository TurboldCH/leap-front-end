"use client";

import { createContext, useState } from "react";
import UseLocalStorageState from "../useLocalStorageState/useLocalStorageState";

export const ProductsContext = createContext({
  selectedProducts: [],
  setSelectedProducts: (any: any) => {},
});

export function ProductsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedProducts, setSelectedProducts] = UseLocalStorageState(
    "cart",
    []
  );
  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
