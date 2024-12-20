import React, { useState, useEffect } from "react";
import { Form, Button, Table, Pagination } from "react-bootstrap";
import {
  deleteCategory,
  getAllCaregories,
  getCaregoryById,
  saveCategory,
  updateCategory,
} from "../../../../../services/CategoryService";

const CategoryTabContent = () => {
  //Component constants labels
  const TABLENAME = "Category List";

  //Table & Form
  const [formData, setFormData] = useState({ id: "", categoryName: "" });
  const [isEditing, setIsEditing] = useState(false);

  //API responses
  const [categories, setCategories] = useState([]);

  //useEffect hook
  useEffect(() => {
    fetchAllCategories();
  }, []); //[] : means that the effect will run only once on the initial render


  //Arrow functions
  const fetchAllCategories = async () => {
    //call API for getAll
    const data = await getAllCaregories();
    setCategories(data);
  };

  const handleCategoryNameChange = (event) => {
    //name, value : attributes of the form controller
    const { name, value } = event.target;

    /*update the categoryName property of formData 
    without affecting other properties (like id).*/
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    /*prevents the form from being submitted to the server
    You can then perform any custom logic, such as sending 
    the data via an API or displaying an error message.
    */
    event.preventDefault();

    if (isEditing) {
      //update
    }
    else {
      //save
      //call API for save
      await saveCategory({ categoryName: formData.categoryName });
    }
    //Reset formData to empty
    setFormData({ id: "", categoryName: "" });
    setIsEditing(false);

    //To get latest data from backend
    fetchAllCategories();
  };

  return (
    <div>
      <h5 className="mb-4">Book Categories</h5>

      {/* [Start] : Form */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">New/Update Entry</h2>
        <div className="main-content-form-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                required
                value={formData.categoryName}
                onChange={handleCategoryNameChange}
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="primary" type="submit" className="button-style">
                {isEditing ? "Update" : "Save"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* [End]   : Form */}

      {/* [Start] : Table - search bar */}
      <div className="main-content-table-container">
        <h2 className="main-content-table-title">{TABLENAME}</h2>

        {/* [Start] : Search bar */}
        <div className="main-content-table-search-bar-container mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            className="main-content-table-search-bar"
          />
        </div>
        {/* [End] : Search bar */}

        {/* [Start] : Table */}
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="main-content-table-action-column">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>1</th>
              <th>Lakshitha</th>
              <th className="main-content-table-action-column">
                <Button variant="outline-primary" size="sm">
                  EDIT
                </Button>{" "}

                <Button variant="outline-danger" size="sm">
                  DELETE
                </Button>
              </th>
            </tr>
          </tbody>
        </Table>
        {/* [End] : Table */}

        {/* [Start] : Table Pagination Controller*/}
        <Pagination>
          <Pagination.Prev>
          </Pagination.Prev>

          <Pagination.Item>
            1
          </Pagination.Item>

          <Pagination.Next>
          </Pagination.Next>
        </Pagination>
        {/* [End]   : Table Pagination Controller*/}

      </div>
      {/* [End]   : Table - search bar */}
    </div>
  );
};

export default CategoryTabContent;


