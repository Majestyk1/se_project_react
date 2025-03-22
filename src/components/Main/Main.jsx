import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTempUnitContext from "../../context/CurrentTempUnitContext";

const Main = ({ weatherData, clothingItems, onSelectItem }) => {
  const { currrentTempUnit } = React.useContext(CurrentTempUnitContext);
  const filteredClothing = (
    Array.isArray(clothingItems) ? clothingItems : []
  ).filter((item) => {
    return (
      (item.weather === "cold" && weatherData.temp.F < 50) ||
      (item.weather === "warm" && weatherData.temp.F >= 50)
    );
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main-clothes">
        <p className="main__weather-info">
          Today is {weatherData.temp[currrentTempUnit]} &deg; {currrentTempUnit}
          / you may want to wear:
        </p>
        <ul className="main__items">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((filteredItem) => (
              <ItemCard
                key={filteredItem._id}
                item={filteredItem}
                onCardClick={() => onSelectItem(filteredItem)}
              />
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
