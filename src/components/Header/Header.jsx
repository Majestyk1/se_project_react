import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/Avatar.svg";
import ToggleSwitch from "../ToogleSwitch/ToogleSwitch";
import { Link } from "react-router-dom";

const Header = ({ weatherData, openModal, currentUser }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userContext = useContext(CurrentUserContext);
  console.log("UserContext data:", userContext.currentUser);
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <div className="header__info">
        <p className="header__date">{currentDate}</p>
        <p className="header__location">, {weatherData.city}</p>
      </div>
      <ToggleSwitch />
      <button
        className="header__add-button"
        type="button"
        onClick={() => openModal("addGarment")}
      >
        + Add Clothes
      </button>
      {!userContext.currentUser ? (
        <>
          <button
            className="header__login-button"
            type="button"
            onClick={() => openModal("login")}
          >
            Log in
          </button>
          <button
            className="header__signup-button"
            type="button"
            onClick={() => openModal("signup")}
          >
            Sign up
          </button>
        </>
      ) : (
        <Link to="/profile" className="header__link">
          <div className="header__user">
            <p className="header__username">{userContext.currentUser.name}</p>
            <img
              src={userContext.currentUser.avatar}
              alt={userContext.currentUser.name || "User avatar"}
              className="header__avatar"
            />
          </div>
        </Link>
      )}
    </header>
  );
};

export default Header;
