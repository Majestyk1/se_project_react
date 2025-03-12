import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <li
      className="card"
      onClick={onCardClick}
      style={{ fontFamily: "CabinetGrotesk-Bold" }}
    >
      <h2 className="card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__image" />
    </li>
  );
};

export default ItemCard;
