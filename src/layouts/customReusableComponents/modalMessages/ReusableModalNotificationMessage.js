import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReusableModalNotificationMessage = ({ show, modalHeader, modalBody, onConfirm }) => {
  return (
    <Modal show={show} onHide={onConfirm}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalBody}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm} className="button-style">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReusableModalNotificationMessage;
