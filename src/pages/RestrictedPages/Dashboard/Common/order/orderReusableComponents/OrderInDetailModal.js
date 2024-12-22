import React from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

const OrderInDetailModal = ({ show, onClose, rowId }) => {
    const data = [
      { id: 1, info: 'Detail 1' },
      { id: 2, info: 'Detail 2' },
      { id: 3, info: 'Detail 3' },
    ];
  
    // Find the specific row data by matching the ID
    const rowData = data.find(item => item.id === rowId);
  
    return (
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rowData ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{rowData.id}</td>
                    <td>{rowData.info}</td>
                  </tr>
                </tbody>
              </Table>
  
              <Form>
                <Form.Group controlId="readonlyInput">
                  <Form.Label>Read-Only Input</Form.Label>
                  <Form.Control type="text" readOnly value={`Read-only value for ${rowData.info}`} />
                </Form.Group>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
              </Form>
            </>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
      </Modal>
    );
  };
  
  export default OrderInDetailModal;
  
