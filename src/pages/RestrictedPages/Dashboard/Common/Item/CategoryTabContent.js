import React, { useState, useEffect } from "react";
import { Form, Button, Table, Pagination } from "react-bootstrap";
import {
  deleteCategory,
  getAllCategories,
  getCategoryById,
  saveCategory,
  updateCategory,
} from "../../../../../services/CategoryService";

const CategoryTabContent = () => {
  //Component constants labels
  const TABLENAME = "Category List";
  const SUCCESSFUL_SAVE_MESSAGE = "Category saved successfully!"

  //Table & Form
  const [formData, setFormData] = useState({ id: "", categoryName: "" });
  const [isEditing, setIsEditing] = useState(false);

  //API responses
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);

  //useEffect hook
  useEffect(() => {
    fetchAllCategories();
  }, []); //[] : means that the effect will run only once on the initial render


  //Arrow functions
  const fetchAllCategories = async () => {
    //call API for getAll
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleCategoryNameChange = (event) => {
    //name, value : attributes of the form controller
    const { name, value } = event.target;

    /*update the categoryName property of formData 
    without affecting other properties (like id).*/
    setFormData({ ...formData, [name]: value });
  };

  //Handle form submission btn click 
  const handleSubmit = async (event) => {
    /*prevents the form from being submitted to the server
    You can then perform any custom logic, such as sending 
    the data via an API or displaying an error message.
    */
    event.preventDefault();

    if (isEditing) {
      //update
      //call API to update
      await updateCategory(formData.id, { categoryName: formData.categoryName});
    }
    else {
      //save
      //call API for save
      try {
        const response = await saveCategory({ categoryName: formData.categoryName });
        setSuccessMessage(response.message || SUCCESSFUL_SAVE_MESSAGE);
        setErrorMessage(""); // Clear any previous errors
        setTimeout(() => {
          setSuccessMessage(""); // Clear the message after 2 seconds
        }, 2000);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred");
        setSuccessMessage(""); // Clear any previous success message
      }
    }
    //Reset formData to empty
    setFormData({ id: "", categoryName: "" });
    setIsEditing(false);

    //To get latest data from backend
    fetchAllCategories();
  };

  //Handle edit btn click  
  const handleEdit = async (id) => {
    //call API to GetById
    const category = await getCategoryById(id);

    //Load data to form
    setFormData({ id: category.id, categoryName: category.categoryName });
    setIsEditing(true);
  };

  //Handle delete btn click
  const handleDelete = async (id) => {
    //call API to delete
    await deleteCategory(id);
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

            {errorMessage &&
              <div className='text-danger mb-3'>
                {errorMessage}
              </div>
            }

            {successMessage &&
              <div className='text-success mb-3'>
                {successMessage}
              </div>
            }

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
            {categories && categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.categoryName}</td>
                <td className="main-content-table-action-column">
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(category.id)}>
                    EDIT
                  </Button>{" "}

                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(category.id)}>
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
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


