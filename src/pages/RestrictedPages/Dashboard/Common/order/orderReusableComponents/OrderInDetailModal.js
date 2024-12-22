import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const OrderInDetailModal = ({ show, onClose, rowId }) => {
  const data = [
    { id: 1, info: 'Detail 1' },
    { id: 2, info: 'Detail 2' },
    { id: 3, info: 'Detail 3' },
  ];

  // Find the specific row data by matching the ID
  const rowData = data.find(item => item.id === rowId);

  return (
    <div>

      {/* [Start] : Modal window */}
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {rowData ? (
            <>
              {/* [Start] : Order No */}
              <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
                <h5 style={{ color: '#495057', fontWeight: 'bold' }}>Order No : #</h5>
              </div>
              {/* [End]   : Order No */}

              {/* [Start] : user details */}
              <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
                <h5 style={{ textAlign: 'center', color: '#495057', fontWeight: 'bold' }}>Delivery Information</h5>
                <Table bordered striped hover responsive>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>xio</td>
                    </tr>

                    <tr>
                      <th>Email</th>
                      <td>xio@gmail.com</td>
                    </tr>

                    <tr>
                      <th>Address</th>
                      <td>xio@office</td>
                    </tr>

                    <tr>
                      <th>Telephone</th>
                      <td>01223456789</td>
                    </tr>

                  </tbody>
                </Table>
              </div>
              {/* [End] : user details */}

              {/* [Start] : Order details */}
              <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
                <h5 style={{ textAlign: 'center', color: '#495057', fontWeight: 'bold' }}>Order Details</h5>
                <Table bordered striped hover responsive>
                  <thead>
                    <tr>
                      <th>Item No</th>
                      <th>Title</th>
                      <th>Unit Price (Rs.) </th>
                      <th>Quantity</th>
                      <th>Sub Total (Rs.) </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>001</td>
                      <td>abc</td>
                      <td>100</td>
                      <td>2</td>
                      <td>200</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {/* [End] : Order details */}

              {/* [Start] : Display Total amount */}
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', textAlign: 'right' }}>
                <span style={{ fontWeight: 'bold', color: 'red' }}>Total: Rs. 200</span>
              </div>
              {/* [End] : Display Total amount */}

              {/* [Start] : Shipped btn: (From pending) | Delivered btn: (From shipped) */}
              <div className="d-flex justify-content-end" style={{ marginTop: '20px' }}>
                <Button variant="secondary" onClick={onClose} style={{ marginRight: '10px' }}>
                  Close
                </Button>{" "}
                <Button variant="primary">
                  Process
                </Button>
              </div>
              {/* [End] : Shipped btn: (From pending) | Delivered btn: (From shipped) */}
            </>
          ) : (
            <p>No order details available.</p>
          )}
        </Modal.Body>
      </Modal>
      {/* [End] : Modal window */}

    </div>
  );
};

export default OrderInDetailModal;
