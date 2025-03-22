import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onSelectItem }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__title-button">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__button"> + Add new</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((filteredItem) => (
          <ItemCard
            key={filteredItem._id}
            item={filteredItem}
            onCardClick={() => onSelectItem(filteredItem)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
