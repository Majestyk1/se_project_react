import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTempUnitContext from "../../context/CurrentTempUnitContext";

const Main = ({
  weatherData,
  clothingItems,
  onSelectItem,
  openConfirmationModal,
  onCardLike,
}) => {
  const { currentTempUnit } = React.useContext(CurrentTempUnitContext);
  const filteredClothing = (
    Array.isArray(clothingItems) ? clothingItems : []
  ).filter((item) => {
    return (
      (item.weather === "hot" && weatherData.temp.F > 86) ||
      (item.weather === "warm" && weatherData.temp.F >= 66 && weatherData.temp.F <= 86) ||
      (item.weather === "cold" && weatherData.temp.F < 66)
    );
  });
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main-clothes">
        <p className="main__weather-info">
          Today is {weatherData.temp[currentTempUnit]} &deg; {currentTempUnit}/
          you may want to wear:
        </p>
        <ul className="main__items">
          {filteredClothing.map((filteredItem) => (
            <ItemCard
              key={filteredItem._id}
              item={filteredItem}
              onCardClick={() => onSelectItem(filteredItem)}
              onCardDelete={() => openConfirmationModal(filteredItem._id)}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
