import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import OrderDetailModal from './OrderDetailModal';
import ReusableTablePagination from '../../../../../../layouts/customReusableComponents/ReusableTablePagination';

const PendingOrderTable = ({ tabName, data }) => {

  //Modal : Order In detail
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  //Table Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarFilteredItems = data && data.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Table : pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  // Pagination: Slice the categories data based on the current page
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const tblPaginationSlicedItems = searchBarFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchBarFilteredItems.length / rowsPerPage);

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
      {/* [Start] : Table - search bar */}
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">{tabName}</h2>

        {/* [Start] : Search bar */}
        <div className="main-content-table-search-bar-container mb-3">
          <Form.Control
            type="text"
            placeholder="Search by customer name"
            className="main-content-table-search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* [End] : Search bar */}

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

          {tblPaginationSlicedItems.length === 0 ? (
            <p className="empty-list-message text-center text-muted">
              No orders were found. Please ensure that the date is correct.
            </p>
          ) : (
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
          )}
        </Table>
        {/* [End]   : Table */}


        {/* [Start] : Table Pagination Controller*/}
        <ReusableTablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        {/* [End]   : Table Pagination Controller*/}

        {/* [Start] : Reusable Modal (Custom component) : for order In detail*/}
        <OrderDetailModal show={showModal} onClose={handleCloseModal} rowId={selectedRowId} />
        {/*[End]    : Reusable Modal (Custom component): for order In detail */}

      </div>
      {/* [End]   : Table - search bar */}

    </div>
  );
};

export default PendingOrderTable;
