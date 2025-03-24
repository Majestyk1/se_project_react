import { handleServerResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(handleServerResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(data.main.temp);
  result.isDay = isDay(data.sys, Date.now());
  result.condition = data.weather[0].main.toLowerCase();
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperture) => {
  if (temperture > 86) {
    return "hot";
  } else if (temperture >= 66 && temperture < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
