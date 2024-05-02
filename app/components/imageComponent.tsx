"use client";

import { useEffect, useState } from "react";

const IMAGE_ACCESS_KEY = process.env.NEXT_PUBLIC_IMAGE_ACCESS_KEY;

export const ImageComponent = (query: any) => {
  const [images, setImages] = useState();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("IMAGE FETCHING", query.query);
        const response = await fetch(
          `https://pixabay.com/api/?key=${IMAGE_ACCESS_KEY}&q=${query.query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.totalHits === 0) {
          return fetchRandomImage();
        }
        setImages(data.hits[0].webformatURL);
      } catch (error) {
        console.error("There was a problem fetching images:", error);
      }
    };
    const fetchRandomImage = async () => {
      const response = await fetch(
        `https://pixabay.com/api/?key=${IMAGE_ACCESS_KEY}&q=random`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.hits.length);
      setImages(data.hits[randomIndex].webformatURL);
    };
    if (query.query) {
      fetchImages();
    }
  }, [query]);
  return (
    <>
      <img
        src={images}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          maxWidth: "100%",
          maxHeight: "100%",
          filter:
            "saturate(150%) contrast(120%) hue-rotate(10deg)drop-shadow(1px 20px 10px rgba(0, 0, 0, 0.3))",
        }}
      />
    </>
  );
};
