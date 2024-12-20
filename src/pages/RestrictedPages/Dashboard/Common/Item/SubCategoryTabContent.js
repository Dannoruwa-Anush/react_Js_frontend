import {
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  saveSubCategory,
  updateSubCategory,
} from "../../../../../services/SubCategoryService";
import ReusableModalMessage from "../../../../../layouts/customReusableComponents/ReusableModalMessage";
import ReusableTablePagination from "../../../../../layouts/customReusableComponents/ReusableTablePagination";
import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { getAllCategories } from "../../../../../services/CategoryService";

const SubCategoryTabContent = () => {
  //Component constants labels
  const TABLENAME = "Sub Category List";
  const SUCCESSFUL_SAVE_MESSAGE = "Sub category saved successfully!"

  //Table & Form
  const [formData, setFormData] = useState({ id: "", subCategoryName: "", categoryId: "" });
  const [isEditing, setIsEditing] = useState(false);

  //API responses
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  //Modal : delete confirmation
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Table Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarFilteredItems = subCategories && subCategories.filter((subCategory) =>
    subCategory.subCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
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
    fetchAllSubCategories();
    fetchAllCategories();
  }, []); //[] : means that the effect will run only once on the initial render


  //Arrow functions
  const fetchAllSubCategories = async () => {
    //call API for getAll
    const data = await getAllSubCategories();
    setSubCategories(data);
  };

  const fetchAllCategories = async () => {
    //call API for getAll
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleInputChange = (event) => {
    //name, value : attributes of the form controller
    const { name, value } = event.target;

    /*
    update the categoryName property of formData 
    without affecting other properties (like id)
    using spread operator
    */
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
      await updateSubCategory(formData.id, { subCategoryName: formData.subCategoryName, categoryId: formData.categoryId });
    }
    else {
      //save
      //call API for save
      try {
        const response = await saveSubCategory({ subCategoryName: formData.subCategoryName, categoryId: formData.categoryId });
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
    setFormData({ id: "", subCategoryName: "", categoryId: "" });
    setIsEditing(false);

    //To get latest data from backend
    fetchAllSubCategories();
  };

  //Handle edit btn click  
  const handleEdit = async (id) => {
    //call API to GetById
    const subCategory = await getSubCategoryById(id);

    //Load data to form
    setFormData({ id: subCategory.id, subCategoryName: subCategory.subCategoryName, categoryId: subCategory.category.id });
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
    await deleteSubCategory(idToDelete);

    setShowModal(false);
    setIdToDelete(null);
    fetchAllSubCategories();

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
      <h5 className="mb-4">Book Sub Categories</h5>

      {/* [Start] : Form */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">{formData.id ? "Edit" : "New"} Entry</h2>
        <div className="main-content-form-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Sub Category Name</Form.Label>
              <Form.Control
                type="text"
                name="subCategoryName"
                required
                value={formData.subCategoryName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category Type</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleInputChange}
              >
                <option value="">-- Select a Category --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
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
          No sub categories found. Please add some sub categories to get started.
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
                <th>Sub Category Name</th>
                <th>Category Name</th>
                <th className="main-content-table-action-column">Action</th>
              </tr>
            </thead>

            <tbody>
              {tblPaginationSlicedItems && tblPaginationSlicedItems.map((subCategory) => (
                <tr key={subCategory.id}>
                  <td>{subCategory.id}</td>
                  <td>{subCategory.subCategoryName}</td>
                  <td>{subCategory.categoryName}</td>
                  <td className="main-content-table-action-column">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(subCategory.id)}>
                      EDIT
                    </Button>{" "}

                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(subCategory.id)}>
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

export default SubCategoryTabContent;
