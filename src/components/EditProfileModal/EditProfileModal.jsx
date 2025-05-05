import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { React, useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [nameError, setNameError] = useState("");
  const [avatarError, setAvatarError] = useState("");

  // Initialize form with current user data when modal opens
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      // Reset error states
      setNameError("");
      setAvatarError("");
    }
  }, [isOpen, currentUser]);

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 2) {
      setNameError("Name must be at least 2 characters long");
    } else if (value.length > 30) {
      setNameError("Name must be less than 30 characters long");
    } else {
      setNameError("");
    }
  };

  const handleAvatarChange = (e) => {
    const value = e.target.value;
    setAvatar(value);
    if (!validateURL(value)) {
      setAvatarError("Please enter a valid URL");
    } else {
      setAvatarError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError && !avatarError) {
      onSubmit(name, avatar);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Edit Profile"
      buttonText="Save changes"
    >
      <label htmlFor="signup-name" className="modal__label">
        Name
        <input
          className="modal__input modal__input_type_card-name"
          id="signup-name"
          placeholder="Name"
          type="text"
          minLength="2"
          maxLength="30"
          required
          onChange={handleNameChange}
          value={name}
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>

      <label htmlFor="signup-avatar" className="modal__label">
        Avatar
        <input
          className="modal__input modal__input_type_avatar"
          id="signup-avatar"
          placeholder="Avatar URL"
          type="url"
          required
          onChange={handleAvatarChange}
          value={avatar}
        />
        {avatarError && <span className="modal__error">{avatarError}</span>}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
