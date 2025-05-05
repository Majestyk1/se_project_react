import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./ItemCard.css";

const ItemCard = ({ item, onCardClick, onCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike({ _id: item._id, isLiked });
  };
  return (
    <li
      className="item__card"
      onClick={() => {
        onCardClick(item);
      }}
    >
      <img src={item.imageUrl} alt={item.name} className="item__card-image" />
      <div className="item__card-container">
        <h2 className="item__card-name">{item.name}</h2>
        {currentUser && (
          <button
            className={`item__like-button ${
              isLiked ? "item__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
          >
            <span className="item__like-button-content">
              {isLiked ? "❤️" : "🤍"}
            </span>
          </button>
        )}
      </div>
    </li>
  );
};

export default ItemCard;
