import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { React, useState, useEffect } from "react";

function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", { email, password });
    onSubmit(email, password);
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="login"
      title="Sign in"
      buttonText="Sign in"
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          className="modal__input modal__input_type_email"
          id="login-email"
          placeholder="Email"
          type="email"
          minLength="2"
          maxLength="30"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          className="modal__input modal__input_type_password"
          id="login-password"
          placeholder="Password"
          type="password"
          minLength="2"
          maxLength="30"
          required
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
