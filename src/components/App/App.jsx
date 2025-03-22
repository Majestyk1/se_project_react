import React, { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  defaultClothingItems,
  coordinates,
  APIkey,
} from "../../utils/constants";
import CurrentTempUnitContext from "../../context/CurrentTempUnitContext";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: { F: 0, C: 0 },
    type: "",
    city: "",
    condition: "",
    isDay: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currrentTempUnit, setCurrentTempUnit] = useState("F");

  const handleToggleTempChange = () => {
    setCurrentTempUnit(currrentTempUnit === "F" ? "C" : "F");
  };

  const openModal = (modalType, item = null) => {
    setSelectedItem(item);
    setIsModalOpen(modalType);
  };

  const closeModal = () => {
    setIsModalOpen(null);
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    openModal("itemDetails", item);
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather },
      ...prevItems,
    ]);
    closeModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   setClothingItems(defaultClothingItems);
  // }, [currrentTempUnit]);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currrentTempUnit, handleToggleTempChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            openModal={() => openModal("addGarment")}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onSelectItem={handleItemClick}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onSelectItem={handleItemClick}
                />
              }
            ></Route>
          </Routes>
          <AddItemModal
            onClose={closeModal}
            isOpen={isModalOpen === "addGarment"}
            onAddItemSubmit={handleAddItemSubmit}
          />
          {isModalOpen === "itemDetails" && (
            <ItemModal
              isOpen={isModalOpen === "itemDetails"}
              item={selectedItem}
              onClose={closeModal}
            />
          )}
          <Footer />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
