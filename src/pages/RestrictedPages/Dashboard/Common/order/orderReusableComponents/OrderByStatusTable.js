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
      <div className="main-content-table-container">

        <h2 className="main-content-table-title">{tabName}</h2>
        {/* [Start] : Search bar */}
        {/* [End] :   Search bar */}

        {/* [Start] : Table */}
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total Amount (RS.)</th>
              <th>Purchase Date</th>
              <th className="main-content-table-action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.totalAmount}</td>
                <td>{order.createdAt}</td>
                <td className="main-content-table-action-column">
                  <Button variant="outline-primary" size="sm" onClick={() => handleViewClick(order.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* [End] :   Table */}

        {/* [Start] : Table Pagination Controller*/}
        {/* [End] :   Table Pagination Controller*/}

        {/* [Start] : Reusable Modal (Custom component) : for order details */}
        <OrderDetailModal show={showModal} onClose={handleCloseModal} rowId={selectedRowId} />
        {/* [End]   : Reusable Modal (Custom component) : for order details */}

      </div>

    </div>
  );
};

export default PendingOrderTable;
