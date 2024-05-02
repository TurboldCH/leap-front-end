"use client";

import { ImageComponent } from "./imageComponent";
import { Share } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ItemData = ({
  id,
  name,
  brand,
  price,
  description,
  release_date,
  size,
  color,
}: any) => {
  const { push } = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ cursor: "pointer" }}
      onClick={() => {
        push(`components/${id}`);
      }}
    >
      <section className="product">
        <div className="product__photo">
          <div className="photo-container">
            <div className="photo-main">
              <div className="controls">
                <Share />
                <FavoriteBorderIcon />
              </div>
              <ImageComponent query={brand} />
            </div>
          </div>
        </div>
        <div className="product__info">
          <div className="title">
            <h1>{name}</h1>
            <span>BRAND: {brand}</span>
          </div>
          <div className="price">
            $ <span>{price}</span>
          </div>
          <div className="variant">
            <h3>SELECT A COLOR</h3>
            <span>{color}</span>
          </div>
          <div className="description">
            <h3>DETAILS</h3>
            <ul>
              <li>Size: {size}</li>
              <li className="paragraph">{description}</li>
            </ul>
          </div>
          <div className="release_date">
            <h3>RELEASE DATE</h3>
            <span>{release_date}</span>
          </div>
          <button className="buy--btn">ADD TO CART</button>
        </div>
      </section>
    </div>
  );
};
