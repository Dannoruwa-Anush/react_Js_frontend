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
import { Form, Button, Table, Dropdown } from "react-bootstrap";
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
  const [showFileInput, setShowFileInput] = useState(false);  // To toggle file input visibility in edit mode


  //Form : Dropdown search bar
  const [dropdownSearchTerm, setDropdownSearchTerm] = useState("");
  const [isAuthorDropdownOpen, setIsAuthorDropdownOpen] = useState(false);
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] = useState(false);

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
    const { name, value, files } = event.target;

    // Handle file input for cover image
    if (name === "coverImage") {
      if (files && files.length > 0) {
        setFormData({ ...formData, coverImage: files[0] });
      } else {
        setFormData({ ...formData, coverImage: null });  // Clear the cover image
      }
    } else {
      // Handle other fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // Filter authors : form-dropdown-search bar
  const filteredAuthors = authors.filter((author) =>
    author.authorName.toLowerCase().includes(dropdownSearchTerm.toLowerCase())
  );

  // Filter subCategories : form-dropdown-search bar
  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.subCategoryName.toLowerCase().includes(dropdownSearchTerm.toLowerCase())
  );

  // Handle form dropdown selection
  const handleDropDownSelect = (inputNameItem, inputValueItem) => {
    handleInputChange({ target: { name: inputNameItem, value: inputValueItem } });

    setIsAuthorDropdownOpen(false);  // Close author dropdown after selection
    setIsSubCategoryDropdownOpen(false);  // Close subcategory dropdown after selection
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Use FormData for file uploads
    const data = new FormData();
    data.append("title", formData.title);
    data.append("unitPrice", formData.unitPrice);
    data.append("qoh", formData.qoh);
    data.append("subCategoryId", formData.subCategoryId);
    data.append("authorId", formData.authorId);

    // If coverImage is null (no image selected), append an empty file object
    if (!formData.coverImage) {
      data.append("coverImage", new File([], ""));  // Empty file if no image selected
    } else {
      data.append("coverImage", formData.coverImage); // File object
    }

    if (isEditing) {
      // Update the existing book
      data.append("id", formData.id);
      await updateBook(formData.id, data);
    } else {
      // Save new book
      try {
        const response = await saveBook(data);
        setSuccessMessage(response.message || SUCCESSFUL_SAVE_MESSAGE);
        setErrorMessage(""); // Clear any previous errors
        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message after 2 seconds
        }, 2000);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred");
        setSuccessMessage(""); // Clear any previous success message
      }
    }

    // Reset form data after submission
    setFormData({ id: "", title: "", unitPrice: "", qoh: "", coverImage: "", subCategoryId: "", authorId: "" });
    setShowFileInput(false); // Hide file input after form submission
    fileInputRef.current.value = ""; // Clear the file input
    setIsEditing(false);

    // Refresh books data
    fetchAllBooks();
  };

  //Handle edit btn click  
  const handleEdit = async (id) => {
    const book = await getBookById(id);
    setFormData({
      id: book.id,
      title: book.title,
      unitPrice: book.unitPrice,
      qoh: book.qoh,
      coverImage: book.coverImage, // Assuming this is the filename or path of the cover image
      subCategoryId: book.subCategory.id,
      authorId: book.author.id
    });
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

            {/* [Start] : Image uploader */}
            <Form.Group className="mb-3">
              <Form.Label>Cover Image</Form.Label>

              {/* If editing and no file is selected, show the image preview and change button */}
              {isEditing && !showFileInput && formData.coverImage && (
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={`${API_IMAGE_URL}/${formData.coverImage}`}
                      alt="Current cover"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setShowFileInput(true)}
                    className="mb-2"
                  >
                    Change Cover Image
                  </Button>
                </div>
              )}

              {/* If not editing or if user clicks 'Change Cover Image', show the file input */}
              {(isEditing && showFileInput) || !isEditing ? (
                <Form.Control
                  type="file"
                  name="coverImage"
                  required={!isEditing}  // Required when creating a new book
                  ref={fileInputRef}
                  onChange={handleInputChange}
                  accept="image/*"
                />
              ) : null}
            </Form.Group>
            {/* [End] : Image uploader */}

            {/* [Start] - Author Dropdown with Search Bar */}
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>

              <Dropdown show={isAuthorDropdownOpen} onToggle={() => setIsAuthorDropdownOpen(!isAuthorDropdownOpen)}>
                <Dropdown.Toggle variant="light" className="w-100">
                  {formData.authorId ? authors.find(c => c.id === formData.authorId)?.authorName : '-- Select a Author --'}
                </Dropdown.Toggle>

                {/* [Start] - Dropdown search bar */}
                <Dropdown.Menu className="w-100">
                  <Form.Control
                    type="text"
                    placeholder="Search for a author"
                    value={dropdownSearchTerm}
                    onChange={(e) => setDropdownSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {/* [End] - Dropdown search bar */}

                  {/* Filtered author List */}
                  {filteredAuthors.length === 0 ? (
                    <Dropdown.ItemText>No authors found</Dropdown.ItemText>
                  ) : (
                    filteredAuthors.map((author) => (
                      <Dropdown.Item
                        key={author.id}
                        onClick={() => handleDropDownSelect("authorId", author.id)}
                      >
                        {author.authorName}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {/* [End] - Author Dropdown with Search Bar */}

            {/* [Start] - SubCategory Dropdown with Search Bar */}
            <Form.Group className="mb-3">
              <Form.Label>Sub Category</Form.Label>

              <Dropdown show={isSubCategoryDropdownOpen} onToggle={() => setIsSubCategoryDropdownOpen(!isSubCategoryDropdownOpen)}>
                <Dropdown.Toggle variant="light" className="w-100">
                  {formData.subCategoryId ? subCategories.find(c => c.id === formData.subCategoryId)?.subCategoryName : '-- Select a Sub Category --'}
                </Dropdown.Toggle>

                {/* [Start] - Dropdown search bar */}
                <Dropdown.Menu className="w-100">
                  <Form.Control
                    type="text"
                    placeholder="Search for a category"
                    value={dropdownSearchTerm}
                    onChange={(e) => setDropdownSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {/* [End] - Dropdown search bar */}

                  {/* Filtered Category List */}
                  {filteredSubCategories.length === 0 ? (
                    <Dropdown.ItemText>No sub categories found</Dropdown.ItemText>
                  ) : (
                    filteredSubCategories.map((subCategory) => (
                      <Dropdown.Item
                        key={subCategory.id}
                        onClick={() => handleDropDownSelect("subCategoryId", subCategory.id)}
                      >
                        {subCategory.subCategoryName}
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {/* [End] - Sub Category Dropdown with Search Bar */}

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

