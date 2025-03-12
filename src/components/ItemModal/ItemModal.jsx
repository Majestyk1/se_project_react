import "./ItemModal.css";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, item, onClose }) {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content_type_image">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          &#10005;
        </button>
        {item && (
          <div>
            <img src={item.link} alt={item.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{item.name}</h2>
              <p className="modal__weather">Weather: {item.weather}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
