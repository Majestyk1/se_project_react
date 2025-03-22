import "./ToogleSwitch.css";
import { useContext, useEffect } from "react";
import CurrentTempUnitContext from "../../context/CurrentTempUnitContext";

function ToogleSwitch(props) {
  const { handleToggleTempChange } = useContext(CurrentTempUnitContext);

  return (
    <label className="switch">
      <input
        className="switch__input"
        type="checkbox"
        checked={props.isChecked}
        onChange={handleToggleTempChange}
      />
      <span className="switch__slider"></span>
      <span className="switch__text switch__text_f">F</span>
      <span className="switch__text switch__text_c">C</span>
    </label>
  );
}

export default ToogleSwitch;
