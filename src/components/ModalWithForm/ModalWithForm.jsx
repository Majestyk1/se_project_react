import useModalClose from "../../hooks/useModalClose";
import "./ModalWithForm.css";

const ModalWithForm = ({
  onClose,
  isOpen,
  children,
  buttonText,
  title,
  name,
  onSubmit,
}) => {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn" onClick={onClose}>
          &#10005;
        </button>
        <form onSubmit={onSubmit} name={name} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
