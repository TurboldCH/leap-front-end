"use client";
import { useState, useEffect } from "react";

export default function UseLocalStorageState(key: string, defaultValue: any) {
  // Retrieve the stored value from localStorage
  const storedValue =
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue;

  // Create state to store the value
  const [value, setValue] = useState(initial);

  // Update localStorage when the state changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
