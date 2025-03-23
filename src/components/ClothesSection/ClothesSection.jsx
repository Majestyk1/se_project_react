import "./ClothesSection.css";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  openConfirmationModal,
  openModal,
  handleCardDelete: onCardDelete,
}) {
  if (!clothingItems) {
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
            onCardClick={() => openConfirmationModal(filteredItem)}
            onCardDelete={() => {
              console.log("Attempting to delete item:", filteredItem);
              onCardDelete(filteredItem._id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
