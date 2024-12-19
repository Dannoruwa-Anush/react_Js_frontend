import React, { useState } from "react";
import { Form, Button, Table, Pagination } from "react-bootstrap";

const CategoryTabContent = () => {
  // Manage form data and table data
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Mike", age: 35 },
    { id: 4, name: "Sara", age: 28 },
    { id: 5, name: "David", age: 22 },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3; // Display 3 rows per page
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Handle form changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle row click to populate the form
  const handleRowClick = (row) => {
    setFormData(row); // Populate the form with the data of the row
  };

  // Handle adding a new entry or updating an existing entry
  const handleSubmit = () => {
    if (formData.id) {
      // If formData has an ID, we're updating
      setTableData((prev) =>
        prev.map((row) => (row.id === formData.id ? formData : row))
      );
    } else {
      // If no ID, we're adding a new entry
      const newId = tableData.length ? tableData[tableData.length - 1].id + 1 : 1;
      setTableData([...tableData, { ...formData, id: newId }]);
    }
    setFormData({}); // Reset the form after submission
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  // Filtered table data based on search query
  const filteredData = tableData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery) || row.age.toString().includes(searchQuery)
  );

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle row deletion
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      setTableData((prev) => prev.filter((row) => row.id !== id));
    }
  };

  return (
    <div>
      <h2 className="mb-4">Book Categories</h2>

      {/* Form Section */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">{formData.id ? "Edit" : "New"} Entry</h2>
        <Form className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name || ""}
              onChange={handleFormChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              name="age"
              type="number"
              value={formData.age || ""}
              onChange={handleFormChange}
              placeholder="Enter age"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            {formData.id ? "Update" : "Create"} {/* Dynamic button label */}
          </Button>
        </Form>
      </div>

      {/* Table Section with Search Bar */}
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">List</h2>

        {/* Search Bar Section inside Table Container */}
        <div className="search-bar-container mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name or age"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleRowClick(row)} // Populate form with row data for editing
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(row.id)} // Delete the row
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default CategoryTabContent;
