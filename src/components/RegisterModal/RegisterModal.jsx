import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { React, useState, useEffect } from "react";

function RegisterModal({ isOpen, onClose, onSubmit, onLoginClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Add your handle change functions here for each input

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password, avatar });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    const isEmailValid = email.length >= 2 && email.includes("@");
    const isPasswordValid = password.length >= 2 && password.length <= 30;
    const isNameValid = name.length >= 2 && name.length <= 30;
    const isAvatarValid = avatar.length > 0;
    setIsFormValid(
      isEmailValid && isPasswordValid && isNameValid && isAvatarValid
    );
  };

  useEffect(() => {
    validateForm();
  }, [email, password, name, avatar]);

  useEffect(() => {
    // Reset form when modal opens/closes
    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
  }, [isOpen]);

  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Sign up"
      onSubmit={handleSubmit}
    >
      <label htmlFor="signup-email" className="modal__label">
        Email
        <input
          className="modal__input modal__input_type_email"
          id="signup-email"
          placeholder="Email"
          type="email"
          minLength="2"
          maxLength="30"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="signup-password" className="modal__label">
        Password
        <input
          className="modal__input modal__input_type_password"
          id="signup-password"
          placeholder="Password"
          type="password"
          minLength="2"
          maxLength="30"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>

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
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__submit-btn"
          disabled={!isFormValid}
        >
          Sign up
        </button>
        <button
          type="button"
          className="modal__login-btn"
          onClick={onLoginClick}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
