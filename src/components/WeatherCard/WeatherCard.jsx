import React from "react";
import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import CurrentTempUnitContext from "../../context/CurrentTempUnitContext";

const WeatherCard = ({ weatherData }) => {
  const { currrentTempUnit } = React.useContext(CurrentTempUnitContext);
  // const filteredOptions = weatherOption.filter((option) => {
  //   return (
  //     option.day === weatherData.isDay &&
  //     option.condition === weatherData.condition
  //   );
  // });

  // let weatherOption;
  // if (filteredOptions.length === 0) {
  //   weatherOption = defaultWeatherOption;
  // } else {
  //   weatherOption = filteredOptions[0];
  // }
  return (
    <section className="weather__card">
      {currrentTempUnit === "F" ? (
        <p className="weather__temp">{weatherData.temp.F} °F</p>
      ) : (
        <p className="weather__temp">{weatherData.temp.C} °C</p>
      )}
      <img className="weather__logo" src={sunny} alt="sunny" />
    </section>
  );
};

export default WeatherCard;
