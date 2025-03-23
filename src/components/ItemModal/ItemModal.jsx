import "./ItemModal.css";
import useModalClose from "../../hooks/useModalClose";

const styles = {
  closeButton: {
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

function ItemModal({
  isOpen,
  item,
  onClose,
  onCardDelete,
  openConfirmationModal,
}) {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content_type_image">
        <button
          style={styles.closeButton}
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        >
          &#10005;
        </button>

        {item && (
          <div>
            <img src={item.imageUrl} alt={item.name} className="modal__image" />
            <div className="modal__footer">
              <div className="modal__footer-wrapper">
                <h2 className="modal__caption">{item.name}</h2>
                <p className="modal__weather">Weather: {item.weather}</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  openConfirmationModal(item);
                }}
                className="modal__delete-btn"
                type="button"
              >
                Delete item
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
