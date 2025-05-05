import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./ClothesSection.css";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  onSelectItem,
  openModal,
  onCardDelete,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const filteredClothingItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : clothingItems;

  if (!clothingItems || clothingItems.length === 0) {
    return <div className="clothes-section">No items found</div>;
  }
  return (
    <div className="clothes-section">
      <div className="clothes-section__title-button">
        <p className="clothes-section__title">
          {currentUser ? "Your items" : "All items"}
        </p>
        {currentUser && (
          <button
            className="clothes-section__button"
            onClick={() => openModal("addGarment")}
          >
            + Add new
          </button>
        )}
      </div>
      <ul className="clothes-section__items">
        {filteredClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => onSelectItem(item)}
            onCardDelete={() => {
              onCardDelete(item._id);
            }}
            isOwner={currentUser && item.owner === currentUser._id}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
