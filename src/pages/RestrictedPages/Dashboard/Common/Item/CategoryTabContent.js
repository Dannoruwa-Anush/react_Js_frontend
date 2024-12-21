import {
  deleteCategory,
  getAllCategories,
  getCategoryById,
  saveCategory,
  updateCategory,
} from "../../../../../services/CategoryService";
import ReusableModalMessage from "../../../../../layouts/customReusableComponents/ReusableModalMessage";
import ReusableTablePagination from "../../../../../layouts/customReusableComponents/ReusableTablePagination";
import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";

const CategoryTabContent = () => {
  //Component constants labels
  const TABLENAME = "Category List";
  const SUCCESSFUL_SAVE_MESSAGE = "Category saved successfully!"

  //API responses
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);

  //Table & Form
  const [formData, setFormData] = useState({ id: "", categoryName: "" });
  const [isEditing, setIsEditing] = useState(false);

  //Modal : delete confirmation
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Table Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarFilteredItems = categories && categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Table : pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  // Pagination: Slice the categories data based on the current page
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const tblPaginationSlicedItems = searchBarFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchBarFilteredItems.length / rowsPerPage);

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

  const handleInputChange = (event) => {
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

    // Check if the current page is still valid
    const totalItemsAfterDelete = searchBarFilteredItems.length;
    const totalPagesAfterDelete = Math.ceil(totalItemsAfterDelete / rowsPerPage);

    // If the current page exceeds the total pages after deletion, reset to the last valid page
    if (currentPage > totalPagesAfterDelete) {
      setCurrentPage(totalPagesAfterDelete); // Reset to last valid page
    } else {
      setCurrentPage(1); // Reset to the first page if needed
    }
  };

  return (
    <div>
      <h5 className="mb-4">Book Categories</h5>

      {/* [Start] : Form */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">{formData.id ? "Edit" : "New"} Entry</h2>
        <div className="main-content-form-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                required
                value={formData.categoryName}
                onChange={handleInputChange}
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
      {tblPaginationSlicedItems.length === 0 ? (
        <p className="empty-list-message text-center text-muted">
          No categories found. Please add some categories to get started.
        </p>
      ) : (
        <div className="main-content-table-container">
          <h2 className="main-content-table-title">{TABLENAME}</h2>

          {/* [Start] : Search bar */}
          <div className="main-content-table-search-bar-container mb-3">
            <Form.Control
              type="text"
              placeholder="Search by name"
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
                <th>Name</th>
                <th className="main-content-table-action-column">Action</th>
              </tr>
            </thead>

            <tbody>
              {tblPaginationSlicedItems && tblPaginationSlicedItems.map((category) => (
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
          <ReusableTablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          {/* [End]   : Table Pagination Controller*/}


          {/* [Start] : Reusable Modal (Custom component) : for delete confirmation */}
          <ReusableModalMessage
            show={showModal}
            modalHeader="Confirm Removal"
            modalBody="Are you sure you want to remove this?"
            onCancel={cancelRemove}
            onConfirm={confirmRemove}
          />
          {/*[End]    : Reusable Modal (Custom component): for delete confirmation */}

        </div>
      )}
      {/* [End]   : Table - search bar */}
    </div>
  );
};

export default CategoryTabContent;


