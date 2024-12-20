import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReusableModalMessage = ({ show, modalHeader, modalBody, onCancel, onConfirm }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalBody}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} className="button-style">
          No
        </Button>
        <Button variant="danger" onClick={onConfirm} className="button-style">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReusableModalMessage;
