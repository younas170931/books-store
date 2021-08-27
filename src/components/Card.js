import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "../styles/Card.css";

export default function Card({ item, onAddToCart }) {
  return (
    <div className="cardC">
      <Link to={`/books/${item._id}`}>
        <div className="cardC__img">
          <img src={item.images[0].url} alt={item.title} />
        </div>
      </Link>
      <div className="cardC__content">
        <Link to={`/books/${item._id}`}>
          <h2 className="cardC__title">{item.title}</h2>
        </Link>

        <div className="cardC__cta">
          <Link to={`/books/${item._id}`}>
            <h6 className="cardC__price">${item.price}</h6>
          </Link>
          <ShoppingCartOutlined
            className="cardC__cartIcon"
            onClick={onAddToCart}
          />
        </div>
      </div>
      {item?.pdf && <div className="cardC__labelTop">PDF</div>}
    </div>
  );
}
