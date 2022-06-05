import React from 'react';
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ imageUrl, description, price, name, productId, isDonation }) => {
  return (
    <div className={`product ${isDonation? 'product__donation' : ''}`}>
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">{description.substring(0, 100)}...</p>

        {
        isDonation ? <p className="donation__price">Free</p> :<p className="info__price">${price}</p>
        }

        <div>
        <Link to={`/product/${productId}`} className="info__button">
          View
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
