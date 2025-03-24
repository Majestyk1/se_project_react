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
import { getItems, deleteItems, addItems } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentTempUnit, setCurrentTempUnit] = useState(
    () => localStorage.getItem("temperatureUnit") || "F"
  );

  const handleToggleTempChange = () => {
    const newUnit = currentTempUnit === "F" ? "C" : "F";
    setCurrentTempUnit(newUnit);
    localStorage.setItem("temperatureUnit", newUnit);
  };

  const openModal = (modalType, item = null) => {
    setSelectedItem(item);
    setIsModalOpen(modalType);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleItemClick = (data) => {
    openModal("itemDetails", data);
  };

  const openConfirmationModal = (item) => {
    if (!item) {
      console.error("No item selected for deletion.");
      return;
    }
    setCardToDelete(item);
    setIsModalOpen("delete");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    if (!name || !imageUrl || !weather) {
      console.error("Invalid item data");
      return;
    }

    addItems({ name, imageUrl, weather })
      .then((newItem) => {
        if (newItem) {
          setClothingItems((prevItems) => [newItem, ...prevItems]);
          closeModal();
        }
      })
      .catch(console.error);
  };
  const handleCardDelete = () => {
    if (!cardToDelete?._id) {
      console.error("No item ID found");
      return;
    }
    deleteItems(cardToDelete._id).then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== cardToDelete._id)
      );
      closeModal();
    });
  };
  useEffect(() => {
    Promise.all([
      getWeather(coordinates, APIkey).then(filterWeatherData),
      getItems(),
    ])
      .then(([weatherData, items]) => {
        setWeatherData(weatherData);
        setClothingItems(items);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleToggleTempChange }}
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
                  openConfirmationModal={openConfirmationModal}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onSelectItem={handleItemClick}
                  openModal={openModal}
                  openConfirmationModal={openConfirmationModal}
                />
              }
            ></Route>
          </Routes>

          {isModalOpen === "delete" && (
            <DeleteConfirmationModal
              isOpen={isModalOpen === "delete"}
              item={cardToDelete}
              onClose={closeModal}
              onCardDelete={handleCardDelete}
            />
          )}

          {isModalOpen === "addGarment" && (
            <AddItemModal
              onClose={closeModal}
              isOpen={isModalOpen === "addGarment"}
              onAddItemSubmit={handleAddItemSubmit}
            />
          )}

          {isModalOpen === "itemDetails" && (
            <ItemModal
              isOpen={isModalOpen === "itemDetails"}
              item={selectedItem}
              onClose={closeModal}
              onCardDelete={handleCardDelete}
              openConfirmationModal={openConfirmationModal}
            />
          )}

          <Footer />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
