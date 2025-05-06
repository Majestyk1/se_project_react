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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { addCardLike, removeCardLike } from "../../utils/auth";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, deleteItems, addItems } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function AppContent() {
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
  const [hasLoginError, setHasLoginError] = useState(false);
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
    setHasLoginError(false);
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

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("No token found");
      return;
    }

    (!isLiked ? addCardLike(_id, token) : removeCardLike(_id, token))
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => {
        console.log("Error handling card like:", err);
      });
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
          const formattedNewItem = {
            ...newItem,
            isLiked: false,
            _id: newItem._id,
            owner: newItem.owner,
          };
          setClothingItems((prevItems) => [formattedNewItem, ...prevItems]);
          closeModal();
        }
      })
      .catch(console.error);
  };

  const handleLoginSubmit = async (email, password) => {
    try {
      setHasLoginError(false);
      await userContext.handleLogin(email, password);
      closeModal();
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      setHasLoginError(true);
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
  const handleEditProfileSubmit = async (name, avatar) => {
    try {
      await userContext.handleProfileUpdate(name, avatar);
      closeModal();
      navigate("/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
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
                  onCardLike={handleCardLike}
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
                    onCardLike={handleCardLike}
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
              loginError={hasLoginError}
              onSignUpClick={() => openModal("signup")}
            />
          )}

          {isModalOpen === "signup" && (
            <RegisterModal
              isOpen={isModalOpen === "signup"}
              onClose={closeModal}
              onSubmit={handleSignupSubmit}
              onLoginClick={() => openModal("login")}
            />
          )}
          {isModalOpen === "editProfile" && (
            <EditProfileModal
              isOpen={isModalOpen === "editProfile"}
              onClose={closeModal}
              onSubmit={handleEditProfileSubmit}
            />
          )}
          <Footer />
        </div>
      </div>
    </CurrentTempUnitContext.Provider>
  );
}

function App() {
  return (
    <CurrentUserProvider>
      <AppContent />
    </CurrentUserProvider>
  );
}

export default App;
