import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { React, useState, useEffect } from "react";

function RegisterModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

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
      buttonText="Register"
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
    </ModalWithForm>
  );
}

export default RegisterModal;
