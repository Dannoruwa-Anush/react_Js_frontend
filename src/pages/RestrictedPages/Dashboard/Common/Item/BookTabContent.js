import { getAllAuthors } from "../../../../../services/AuthorService";
import {
  getAllSubCategories,
} from "../../../../../services/SubCategoryService";
import {
  getAllBooks,
  getBookById,
  saveBook,
  updateBook,
  deleteBook,
} from "../../../../../services/BookService";
import ReusableModalMessage from "../../../../../layouts/customReusableComponents/ReusableModalMessage";
import ReusableTablePagination from "../../../../../layouts/customReusableComponents/ReusableTablePagination";
import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { API_IMAGE_URL } from "../../../../../configurations/Config";

const BookTabContent = () => {
  //Component constants labels
  const TABLENAME = "Book List";
  const SUCCESSFUL_SAVE_MESSAGE = "Book saved successfully!"

  //API responses
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  //Table & Form
  const [formData, setFormData] = useState({ id: "", title: "", unitPrice: "", qoh: "", coverImage: "", subCategoryId: "", authorId: "" });
  const [isEditing, setIsEditing] = useState(false);

  //Form file
  const fileInputRef = React.createRef();

  //Form : Dropdown search bar
  const [dropdownSearchTerm, setDropdownSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //Modal : delete confirmation
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Table Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarFilteredItems = books && books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    fetchAllBooks();
    fetchAllAuthors();
    fetchAllSubCategories();
  }, []); //[] : means that the effect will run only once on the initial render


  //Arrow functions
  const fetchAllBooks = async () => {
    //call API for getAll
    const data = await getAllBooks();
    setBooks(data);
  };

  const fetchAllAuthors = async () => {
    //call API for getAll
    const data = await getAllAuthors();
    setAuthors(data);
  };

  const fetchAllSubCategories = async () => {
    //call API for getAll
    const data = await getAllSubCategories();
    setSubCategories(data);
  };

  const handleInputChange = (event) => {
    //name, value : attributes of the form controller
    const { name, value, files } = event.target;

    /*
    update the categoryName property of formData 
    without affecting other properties (like id)
    using spread operator
    */
    // If the input type is 'file', store the file object instead of the value
    if (name === "coverImage") {
      // Store the File object from the input's files property
      setFormData({ ...formData, coverImage: files[0] });
    } else {
      // Update other fields normally
      setFormData({ ...formData, [name]: value });
    }
  };

  //Handle form submission btn click 
  const handleSubmit = async (event) => {
    /*prevents the form from being submitted to the server
    You can then perform any custom logic, such as sending 
    the data via an API or displaying an error message.
    */
    event.preventDefault();

    // Use FormData for file uploads
    const data = new FormData();
    data.append("title", formData.title);
    data.append("unitPrice", formData.unitPrice);
    data.append("qoh", formData.qoh);
    data.append("coverImage", formData.coverImage); // File object
    data.append("subCategoryId", formData.subCategoryId);
    data.append("authorId", formData.authorId);

    if (isEditing) {
      //update
      //call API to update

      // Include ID for update
      data.append("id", formData.id);

      await updateBook(formData.id, data);
    }
    else {
      //save
      //call API for save
      try {
        const response = await saveBook(data);
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
    setFormData({ id: "", title: "", unitPrice: "", qoh: "", coverImage: "", subCategoryId: "", authorId: "" });
    fileInputRef.current.value = ""; // Clear the file input
    setIsEditing(false);

    //To get latest data from backend
    fetchAllBooks();
  };

  //Handle edit btn click  
  const handleEdit = async (id) => {
    //call API to GetById
    const book = await getBookById(id);

    //Load data to form
    setFormData({ id: book.id, title: book.title, unitPrice: book.unitPrice, qoh: book.qoh, coverImage: book.coverImage, subCategoryId: book.subCategory.id, authorId: book.author.id });
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
    await deleteBook(idToDelete);

    setShowModal(false);
    setIdToDelete(null);
    fetchAllBooks();

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
      <h5 className="mb-4">Books</h5>

      {/* [Start] : Form */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">{formData.id ? "Edit" : "New"} Entry</h2>
        <div className="main-content-form-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Unit Price (Rs.)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                name="unitPrice"
                required
                value={formData.unitPrice}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>QOH</Form.Label>
              <Form.Control
                type="number"
                min={0}
                name="qoh"
                required
                value={formData.qoh}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                name="coverImage"
                required
                ref={fileInputRef}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                as="select"
                name="authorId"
                required
                value={formData.authorId}
                onChange={handleInputChange}
              >
                <option value="">-- Select a author --</option>
                {authors && authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.authorName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sub Category Type</Form.Label>
              <Form.Control
                as="select"
                name="subCategoryId"
                required
                value={formData.subCategoryId}
                onChange={handleInputChange}
              >
                <option value="">-- Select a sub category --</option>
                {subCategories && subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.subCategoryName}
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
          No books found. Please add some books to get started.
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
                <th>Title</th>
                <th>UnitPrice (Rs.)</th>
                <th>QOH</th>
                <th>Cover Image</th>
                <th>Author</th>
                <th>category</th>
                <th>Sub category</th>
                <th className="main-content-table-action-column">Action</th>
              </tr>
            </thead>

            <tbody>
              {tblPaginationSlicedItems && tblPaginationSlicedItems.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.unitPrice}</td>
                  <td>{book.qoh}</td>
                  <td>
                    <img
                      src={`${API_IMAGE_URL}/${book.coverImage}`}
                      alt={book.title}
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{book.authorName}</td>
                  <td>{book.categoryName}</td>
                  <td>{book.subCategoryName}</td>
                  <td className="main-content-table-action-column">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(book.id)}>
                      EDIT
                    </Button>{" "}

                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(book.id)}>
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

export default BookTabContent;

