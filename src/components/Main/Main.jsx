import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants.js";
import "./Main.css";

const Main = ({ weatherData, clothingItems, onSelectItem }) => {
  const filteredClothing = clothingItems.filter((item) => {
    return (
      (item.weather === "cold" && weatherData.temp < 10) ||
      (item.weather === "warm" && weatherData.temp >= 10)
    );
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__weather-info">
          Today is {weatherData.temp} &deg; F / you may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={() => onSelectItem(item)}
              />
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
