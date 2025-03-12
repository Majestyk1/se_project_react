// import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/Avatar.svg";

const Header = ({ weatherData, openModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header" style={{ fontFamily: "CabinetGrotesk-Bold" }}>
      <img className="header__logo" src={logo} alt="WTWR Logo" />
      <div className="header__info">
        <p className="header__date">{currentDate}</p>
        <p className="header__location">, {weatherData.city}</p>
      </div>
      <button className="header__add-button" type="button" onClick={openModal}>
        + Add Clothes
      </button>
      <div className="header__user">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
