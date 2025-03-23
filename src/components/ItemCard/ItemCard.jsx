import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <li
      className="item__card"
      onClick={() => {
        onCardClick(item);
      }}
    >
      <h2 className="item__card-name">{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} className="item__card-image" />
    </li>
  );
};

export default ItemCard;
