import {
  CurrentUserProvider,
  CurrentUserContext,
} from "../../context/CurrentUserContext";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import CurrentTempUnitContext from "../../context/CurrentTempUnitContext";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Route, Routes, useNavigate } from "react-router-dom";
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

  const userContext = useContext(CurrentUserContext);
  const navigate = useNavigate();

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
    const token = localStorage.getItem("jwt");
    addItems({ name, imageUrl, weather }, token)
      .then((newItem) => {
        if (newItem) {
          setClothingItems((prevItems) => [newItem, ...prevItems]);
          closeModal();
        }
      })
      .catch(console.error);
  };

  const handleLoginSubmit = async (email, password) => {
    try {
      await userContext.handleLogin(email, password);
      closeModal();
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignupSubmit = async (userData) => {
    try {
      await userContext.handleSignup(userData);
      closeModal();
      navigate("/profile");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleCardDelete = () => {
    if (!cardToDelete?._id) {
      console.error("No item ID found");
      return;
    }
    const token = localStorage.getItem("jwt");
    deleteItems(cardToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        closeModal();
      })
      .catch(console.error);
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
            openModal={openModal}
            weatherData={weatherData}
            handleLogout={userContext.handleLogout}
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
                <ProtectedRoute>
                  <Profile
                    clothingItems={clothingItems}
                    onSelectItem={handleItemClick}
                    openModal={openModal}
                    openConfirmationModal={openConfirmationModal}
                  />
                </ProtectedRoute>
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

          {isModalOpen === "login" && (
            <LoginModal
              isOpen={isModalOpen === "login"}
              onClose={closeModal}
              onSubmit={handleLoginSubmit}
            />
          )}

          {isModalOpen === "signup" && (
            <RegisterModal
              isOpen={isModalOpen === "signup"}
              onClose={closeModal}
              onSubmit={handleSignupSubmit}
            />
          )}
          <Footer />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

function AppWrapper() {
  return (
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  );
}

export default AppWrapper;
