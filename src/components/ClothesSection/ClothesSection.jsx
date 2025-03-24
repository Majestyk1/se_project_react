import "./ClothesSection.css";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  onSelectItem,
  openModal,
  onCardDelete,
}) {
  if (!clothingItems || clothingItems.length === 0) {
    return <div className="clothes-section">No items found</div>;
  }
  return (
    <div className="clothes-section">
      <div className="clothes-section__title-button">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__button"
          onClick={() => openModal("addGarment")}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((filteredItem) => (
          <ItemCard
            key={filteredItem._id}
            item={filteredItem}
            onCardClick={() => onSelectItem(filteredItem)}
            onCardDelete={() => {
              onCardDelete(filteredItem._id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
