import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import OrderDetailModal from './OrderDetailModal';

const PendingOrderTable = ({ tabName, data }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
  
    const handleViewClick = (id) => {
      setSelectedRowId(id); // Set the ID of the selected row
      setShowModal(true); // Show the modal
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedRowId(null); // Reset the selected row ID when closing the modal
    };
  
    return (
      <div>
        <h3>{tabName}</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="primary" onClick={() => handleViewClick(item.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <OrderDetailModal show={showModal} onClose={handleCloseModal} rowId={selectedRowId} />
      </div>
    );
  };
  
  export default PendingOrderTable;
  