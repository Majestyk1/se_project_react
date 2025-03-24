import React from "react";
import useModalClose from "../../hooks/useModalClose";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ isOpen, item, onClose, onCardDelete }) => {
  const styles = {
    closeButton: {
      color: "grey",
      border: "none",
      cursor: "pointer",
    },
  };

  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content_type_delete">
        <button
          style={styles.closeButton}
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        >
          &#10005;
        </button>

        {item && (
          <div className="modal__delete-container">
            <p className="modal__delete-message-name">
              Are you sure you want to delete {item.name}?
            </p>
            <p className="modal__delete-message">
              This action is irreversible.
            </p>
            <div className="modal__delete-actions">
              <button
                className="modal__delete-btn"
                type="button"
                onClick={onCardDelete}
              >
                Yes, delete items
              </button>
              <button
                className="modal__delete-cancel-btn"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
