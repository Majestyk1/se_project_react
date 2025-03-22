import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/Avatar.svg";
import ToogleSwitch from "../ToogleSwitch/ToogleSwitch";
import { Link } from "react-router-dom";

const Header = ({ weatherData, openModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <div className="header__info">
        <p className="header__date">{currentDate}</p>
        <p className="header__location">, {weatherData.city}</p>
      </div>
      <ToogleSwitch />
      <button className="header__add-button" type="button" onClick={openModal}>
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
};

export default Header;
