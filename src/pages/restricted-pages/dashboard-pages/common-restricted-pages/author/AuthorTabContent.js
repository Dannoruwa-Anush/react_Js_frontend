
import ReusableModalConfirmationMessage from "../../../../../layouts/customReusableComponents/modalMessages/ReusableModalConfirmationMessage";
import ReusableTablePagination from "../../../../../layouts/customReusableComponents/ReusableTablePagination";
import { deleteAuthor, getAllAuthors, getAuthorById, saveAuthor, updateAuthor } from "../../../../../services/AuthorService";
import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";


const AuthorTabContent = () => {
  //Component constants labels
  const TABLENAME = "Author List";
  const SUCCESSFUL_SAVE_MESSAGE = "Author saved successfully!"
  const SUCCESSFUL_UPDATE_MESSAGE = "Author Updated successfully!"

  //API responses
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [authors, setAuthors] = useState([]);

  //Table & Form
  const [formData, setFormData] = useState({ id: "", authorName: "" });
  const [isEditing, setIsEditing] = useState(false);

  //Modal : delete confirmation
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Table Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarFilteredItems = authors && authors.filter((author) =>
    author.authorName.toLowerCase().includes(searchTerm.toLowerCase())
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
    fetchAllAuthors();
  }, []); //[] : means that the effect will run only once on the initial render


  //Arrow functions
  const fetchAllAuthors = async () => {
    //call API for getAll
    const data = await getAllAuthors();
    setAuthors(data);
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
      try {
        const response = await updateAuthor(formData.id, { authorName: formData.authorName });
        setSuccessMessage(response.message || SUCCESSFUL_UPDATE_MESSAGE);
        setErrorMessage(""); // Clear any previous errors
        setTimeout(() => {
          setSuccessMessage(""); // Clear the message after 2 seconds
        }, 1000); //1s
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred");
        setSuccessMessage(""); // Clear any previous success message
      }
    }
    else {
      //save
      //call API for save
      try {
        const response = await saveAuthor({ authorName: formData.authorName });
        setSuccessMessage(response.message || SUCCESSFUL_SAVE_MESSAGE);
        setErrorMessage(""); // Clear any previous errors
        setTimeout(() => {
          setSuccessMessage(""); // Clear the message after 2 seconds
        }, 1000); //1s
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred");
        setSuccessMessage(""); // Clear any previous success message
      }
    }
    //Reset formData to empty
    setFormData({ id: "", authorName: "" });
    setIsEditing(false);

    //To get latest data from backend
    fetchAllAuthors();
  };

  //Handle edit btn click  
  const handleEdit = async (id) => {
    //call API to GetById
    const author = await getAuthorById(id);

    //Load data to form
    setFormData({ id: author.id, authorName: author.authorName });
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
    await deleteAuthor(idToDelete);

    setShowModal(false);
    setIdToDelete(null);
    fetchAllAuthors();

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
      <h5 className="mb-4">Authors</h5>

      {/* [Start] : Form */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">{formData.id ? "Edit" : "New"} Entry</h2>
        <div className="main-content-form-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="authorName"
                required
                value={formData.authorName}
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
              <th>No</th>
              <th>Name</th>
              <th className="main-content-table-action-column">Action</th>
            </tr>
          </thead>

          {tblPaginationSlicedItems.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="3" className="main-content-empty-table-message-container">
                  No authors found. Please add some authors to get started.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {tblPaginationSlicedItems && tblPaginationSlicedItems.map((author, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{author.authorName}</td>
                  <td className="main-content-table-action-column">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(author.id)}>
                      EDIT
                    </Button>{" "}

                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(author.id)}>
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
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
        <ReusableModalConfirmationMessage
          show={showModal}
          modalHeader="Confirm Removal"
          modalBody="Are you sure you want to remove this?"
          onCancel={cancelRemove}
          onConfirm={confirmRemove}
        />
        {/*[End]    : Reusable Modal (Custom component): for delete confirmation */}

      </div>
      {/* [End]   : Table - search bar */}
    </div>
  );
};

export default AuthorTabContent;
