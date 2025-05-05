import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { React, useState, useEffect } from "react";

function LoginModal({ isOpen, onClose, onSubmit, loginError, onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoginError, setHasLoginError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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

  const validateForm = () => {
    const isEmailValid = email.length >= 2 && email.includes("@");
    const isPasswordValid = password.length >= 2 && password.length <= 30;
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  useEffect(() => {
    setHasLoginError(loginError);
  }, [loginError]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="login"
      title="Sign in"
      disabled={!isFormValid}
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

      <label
        htmlFor="login-password"
        className={`modal__label ${hasLoginError ? "modal__label_error" : ""}`}
      >
        {hasLoginError ? "Incorrect password" : "Password"}
        <input
          className={`modal__input modal__input_type_password ${
            hasLoginError ? "modal__input_error" : ""
          }`}
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
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__submit-btn"
          disabled={!isFormValid}
        >
          Login
        </button>
        <button
          type="button"
          className="modal__signup-btn"
          onClick={onSignUpClick}
        >
          or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
