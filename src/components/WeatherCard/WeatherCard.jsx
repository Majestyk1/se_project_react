import React from "react";
import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import CurrentTempUnitContext from "../../context/CurrentTempUnitContext";

const WeatherCard = ({ weatherData }) => {
  const { currentTempUnit } = React.useContext(CurrentTempUnitContext);
  return (
    <section className="weather__card">
      {currentTempUnit === "F" ? (
        <p className="weather__temp">{weatherData.temp.F} °F</p>
      ) : (
        <p className="weather__temp">{weatherData.temp.C} °C</p>
      )}
      <img className="weather__logo" src={sunny} alt="sunny" />
    </section>
  );
};

export default WeatherCard;
