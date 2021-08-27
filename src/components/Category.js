import React from "react";

import "../styles/Category.css";
export default function Category({ category }) {
  return (
    <div className="category">
      <div className="category__img">
        <img src={category.image?.url} alt="" />
      </div>
      <h2 className="category__title">{category.title}</h2>
    </div>
  );
}
