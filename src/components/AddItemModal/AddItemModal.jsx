import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { React, useEffect, useState } from "react";

function AddItemModal({ isOpen, onClose, onAddItemSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemSubmit({ name, imageUrl, weather });
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      buttonText={"Add garment"}
      title="New garment"
      onSubmit={handleSubmit}
    >
      <label htmlFor="clothing-name" className="modal__label">
        Name
        <input
          className="modal__input modal__input_type_card-name"
          id="clothing-name"
          placeholder="Name"
          type="text"
          minLength="2"
          maxLength="30"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="clothing-link" className="modal__label">
        Image
        <input
          id="clothing-link"
          name="link"
          placeholder="image URL"
          type="URL"
          className="modal__input modal__input_type_url"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="choiceHot"
          className="modal__label modal__label_type_radio"
        >
          <input
            type="radio"
            id="choiceHot"
            name="weatherType"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label
          htmlFor="choiceWarm"
          className="modal__label modal__label_type_radio"
        >
          <input
            type="radio"
            id="choiceWarm"
            name="weatherType"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label
          htmlFor="choiceCold"
          className="modal__label modal__label_type_radio"
        >
          <input
            type="radio"
            id="choiceCold"
            name="weatherType"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
