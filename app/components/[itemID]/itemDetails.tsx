"use client";

import { ImageComponent } from "../imageComponent";

export const ItemDetail = ({
  name,
  brand,
  price,
  description,
  releaseDate,
  size,
  color,
}: any) => {
  return (
    <div className="itemDetail">
      <div className="itemMain">
        <div className="card">
          <div className="card__title">
            <div className="icon">
              <a href="#">
                <i className="fa fa-arrow-left"></i>
              </a>
            </div>
            <h3>{name}</h3>
          </div>
          <div className="card__body">
            <div className="half">
              <div className="featured_text">
                <h1>{brand}</h1>
                <p className="sub">{releaseDate}</p>
                <p className="price">${price}</p>
              </div>
              <div className="image">
                <ImageComponent query={brand} />
              </div>
            </div>
            <div className="half">
              <div className="description">
                <p>{description}</p>
                <p>Color: {color}</p>
                <p>Size: {size}</p>
              </div>
              <span className="stock">
                <i className="fa fa-pen"></i> In stock
              </span>
              <div className="reviews">
                <ul className="stars">
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star"></i>
                  </li>
                  <li>
                    <i className="fa fa-star-o"></i>
                  </li>
                </ul>
                <span>(64 reviews)</span>
              </div>
            </div>
          </div>
          <div className="card__footer">
            <div className="recommend">
              <p>Recommended by</p>
              <h3>Pinecone</h3>
            </div>
            <div className="action">
              <button type="button">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
