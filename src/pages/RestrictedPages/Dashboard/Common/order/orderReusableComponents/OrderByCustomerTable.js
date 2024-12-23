import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import OrderInDetailModal from './OrderInDetailModal';
import ReusableTablePagination from '../../../../../../layouts/customReusableComponents/ReusableTablePagination';

const OrderByStatusTable = ({ tabName, data }) => {

  //Modal : Order In detail
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  //Table Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarFilteredItems = data && data.filter((order) =>
    order.createdAt.includes(searchTerm)
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
            placeholder="Search by purchase date"
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
              <th>No</th>
              <th>Total Amount (RS.)</th>
              <th>Purchase Date</th>
              <th>Order Status</th>
              <th className="main-content-table-action-column">Action</th>
            </tr>
          </thead>

          {tblPaginationSlicedItems.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="5" className="main-content-empty-table-message-container">
                  No orders were found.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {tblPaginationSlicedItems && tblPaginationSlicedItems.map((order, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.status}</td>
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
        <OrderInDetailModal show={showModal} onClose={handleCloseModal} rowId={selectedRowId} />
        {/*[End]    : Reusable Modal (Custom component): for order In detail */}

      </div>
      {/* [End]   : Table - search bar */}

    </div>
  );
};

export default OrderByStatusTable;
