import React, { useEffect, useState } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  defaultClothingItems,
  coordinates,
  APIkey,
} from "../../utils/constants";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: "",
    type: "",
    city: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (modalType, item = null) => {
    setSelectedItem(item);
    setIsModalOpen(modalType);
  };

  const closeModal = () => {
    setIsModalOpen(null);
    setSelectedItem(null);
  };

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleItemClick = (item) => {
    openModal("itemDetails", item);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        console.log(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          openModal={() => openModal("addGarment")}
          weatherData={weatherData}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onSelectItem={handleItemClick}
        />
        {isModalOpen === "addGarment" && (
          <ModalWithForm
            onClose={closeModal}
            isOpen={isModalOpen === "addGarment"}
            buttonText="Add garment"
            title="New garment"
          >
            <label htmlFor="name" className="modal__label">
              Name{" "}
              <input
                id="name"
                placeholder="Name"
                type="text"
                className="modal__input"
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image{" "}
              <input
                id="imageUrl"
                placeholder="image URL"
                type="URL"
                className="modal__input"
              />
            </label>
            <fieldset className="modal__radio-btns">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label
                id="hot"
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  name="radio"
                  className="modal__radio-input"
                />
                Hot
              </label>
              <label
                id="warm"
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  name="radio"
                  className="modal__radio-input"
                />
                Warm
              </label>
              <label
                id="cold"
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  name="radio"
                  className="modal__radio-input"
                />
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
        )}
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
  );
}

export default App;
