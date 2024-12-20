import React, { useState, useEffect } from "react";
import { Form, Button, Table, Pagination, Modal } from "react-bootstrap";
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

  //Modal : delete confirmation
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Table : pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  // Pagination: Slice the categories data based on the current page
  const indexOfLastCategory = currentPage * rowsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - rowsPerPage;
  const slicedCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / rowsPerPage);

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
      await updateCategory(formData.id, { categoryName: formData.categoryName });
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
  const handleDelete = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  };

  //Handle model cancel btn click
  const cancelRemove = () => setShowModal(false);

  //Handle model confirm btn click
  const confirmRemove = async () => {
    //call API to delete
    await deleteCategory(idToDelete);

    setShowModal(false);
    setIdToDelete(null);
    fetchAllCategories();
  };

  // Pagination: Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
            {slicedCategories && slicedCategories.map((category) => (
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
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
        {/* [End]   : Table Pagination Controller*/}


        {/* [Start] : Modal : for delete confirmation */}
        <Modal show={showModal} onHide={cancelRemove}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="button-style" onClick={cancelRemove}>
              No
            </Button>
            <Button variant="danger" className="button-style" onClick={confirmRemove}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        {/*[End]    : Modal : for delete confirmation */}

      </div>
      {/* [End]   : Table - search bar */}
    </div>
  );
};

export default CategoryTabContent;


