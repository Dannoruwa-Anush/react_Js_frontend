import { Form, Button, Table, Pagination, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { getAllCaregories } from "../../../../../services/CategoryService";

// Define a functional component using an arrow function
const CategoryTabContent = () => {

  //Load categories from API
  const [categoryDetails, setCategoryDetails] = useState([]);

  useEffect(() => {
    const categoriesRequest = async () => {
      const res = await getAllCaregories();
      setCategoryDetails(res);
    };

    categoriesRequest();
  }, [])


  return (

    //JSX (JavaScript XML) used to render the structure of a UI 
    <div>
      <h5 className="mb-4">Book Categories</h5>

      {/* [Start] - Form Section */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">New/Update Entry</h2>
        <div className="main-content-form-box">
          <Form className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                name="categoryName"
                placeholder="Enter category name"
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="primary" className="button-style">
                create
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* [End] - Form Section */}


      {/* [Start] - Table Section with Search Bar */}
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">
          Category List
        </h2>

        {/* [Start] - Search Bar */}
        <div className="main-content-table-search-bar-container mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            className="main-content-table-search-bar"
          />
        </div>
        {/* [End]   - Search Bar */}

        {/* [Start] - Table */}
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="main-content-table-action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryDetails && categoryDetails.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.categoryName}</td>
                <td className="main-content-table-action-column">
                  <Button
                    variant="outline-primary"
                    size="sm"
                  >
                    Edit
                  </Button>{" "}

                  <Button
                    variant="outline-danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* [End]   - Table */}

      </div>
      {/* [End]   - Table Section with Search Bar */}
    </div>

  );
};
export default CategoryTabContent;
// Export the component so it can be used elsewhere in the app

