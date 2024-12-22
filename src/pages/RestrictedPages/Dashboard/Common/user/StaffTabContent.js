import {
  getAllStaffMembers,
  getStaffMemberById,
  deleteStaffMember,
  saveStaffMember,
  updateStaffMember,
} from "../../../../../services/StaffMember";
import {
  getAllStaffRoles
} from "../../../../../services/RoleService";
import ReusableModalMessage from "../../../../../layouts/customReusableComponents/ReusableModalMessage";
import ReusableTablePagination from "../../../../../layouts/customReusableComponents/ReusableTablePagination";

import React, { useState, useEffect } from "react";
import { Form, Button, Table, Dropdown } from "react-bootstrap";

const StaffTabContent = () => {
  //Component constants labels
  const TABLENAME = "Employee List";
  const SUCCESSFUL_SAVE_MESSAGE = "Employee saved successfully!"

  //API responses
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);
  const [staffRoles, setStaffRoles] = useState([]);

  //Table & Form
  const [formData, setFormData] = useState({ id: "", username: "", email: "", address: "", telephoneNumber: "", expectingRoleIds: [] });
  const [isEditing, setIsEditing] = useState(false);

  //Form : Dropdown search bar
  const [dropdownSearchTerm, setDropdownSearchTerm] = useState("");
  const [isStaffRoleDropdownOpen, setIsStaffRoleDropdownOpen] = useState(false);

  //Modal : delete confirmation
  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //Table Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarFilteredItems = staffMembers && staffMembers.filter((staffMember) =>
    staffMember.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Table : pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  // Pagination: Slice the items data based on the current page
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const tblPaginationSlicedItems = searchBarFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchBarFilteredItems.length / rowsPerPage);

  //useEffect hook
  useEffect(() => {
    fetchAllStaffMembers();
    fetchAllStaffRoles();
  }, []); //[] : means that the effect will run only once on the initial render


  //Arrow functions
  const fetchAllStaffMembers = async () => {
    //call API for getAll
    const data = await getAllStaffMembers();
    setStaffMembers(data);
  };

  const fetchAllStaffRoles = async () => {
    //call API for getAll
    const data = await getAllStaffRoles();
    setStaffRoles(data);
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

  // Filter staffRoles : form-dropdown-search bar
  const filteredStaffRoles = staffRoles && staffRoles.filter((staffRole) =>
    staffRole.roleName.toLowerCase().includes(dropdownSearchTerm.toLowerCase())
  );

  // Handle form dropdown multi-selection
  // Handle role selection change
  const handleRoleSelection = (roleId) => {
    const newRoles = [...formData.expectingRoleIds];
    if (newRoles.includes(roleId)) {
      // Remove the role if it was already selected
      const index = newRoles.indexOf(roleId);
      newRoles.splice(index, 1);
    } else {
      // Add the role to the selection
      newRoles.push(roleId);
    }
    setFormData({ ...formData, expectingRoleIds: newRoles });
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
      await updateStaffMember(formData.id, { username: formData.username, email: formData.email, address: formData.address, telephoneNumber: formData.telephoneNumber, expectingRoleIds: formData.expectingRoleIds });
    }
    else {
      //save
      //call API for save
      try {
        const response = await saveStaffMember({ username: formData.username, email: formData.email, address: formData.address, telephoneNumber: formData.telephoneNumber, expectingRoleIds: formData.expectingRoleIds });
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
    setFormData({ id: "", username: "", email: "", address: "", telephoneNumber: "", expectingRoleIds: [] });
    setIsEditing(false);

    //To get latest data from backend
    fetchAllStaffMembers();
  };

  //Handle edit btn click  
  const handleEdit = async (id) => {
    //call API to GetById
    const staffMember = await getStaffMemberById(id);

    //Load data to form
    setFormData({ id: staffMember.id, username: staffMember.username, email: staffMember.email, address: staffMember.address, telephoneNumber: staffMember.telephoneNumber, expectingRoleIds: staffMember.roles.map(role => role.id)});
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
    await deleteStaffMember(idToDelete);

    setShowModal(false);
    setIdToDelete(null);
    fetchAllStaffMembers();

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
      <h5 className="mb-4">Employees</h5>

      {/* [Start] : Form */}
      <div className="main-content-form-container">
        <h2 className="main-content-form-title">{formData.id ? "Edit" : "New"} Entry</h2>
        <div className="main-content-form-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telephone Number</Form.Label>
              <Form.Control
                type="text"
                name="telephoneNumber"
                required
                value={formData.telephoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* [Start] - Category Dropdown with Multi-Select */}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Dropdown show={isStaffRoleDropdownOpen} onToggle={() => setIsStaffRoleDropdownOpen(!isStaffRoleDropdownOpen)}>
                <Dropdown.Toggle variant="light" id="role-dropdown" className="w-100">
                  {formData.expectingRoleIds.length > 0
                    ? staffRoles.filter((role) => formData.expectingRoleIds.includes(role.id)).map((role) => role.roleName).join(", ")
                    : "-- Select Roles --"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  <Form.Control
                    type="text"
                    placeholder="Search for a role"
                    value={dropdownSearchTerm}
                    onChange={(e) => setDropdownSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  {filteredStaffRoles.length === 0 ? (
                    <Dropdown.ItemText>No roles found</Dropdown.ItemText>
                  ) : (
                    filteredStaffRoles.map((staffRole) => (
                      <Dropdown.Item key={staffRole.id}>
                        <Form.Check
                          type="checkbox"
                          label={staffRole.roleName}
                          checked={formData.expectingRoleIds.includes(staffRole.id)}  // This ensures the role is checked if it exists in expectingRoleIds
                          onChange={() => handleRoleSelection(staffRole.id)}
                        />
                      </Dropdown.Item>
                    ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {/* [End] - Category Dropdown with Multi-Select */}

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
          No employees found. Please add some emoloyees to get started.
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
                <th>email</th>
                <th>Address</th>
                <th>Tel - No</th>
                <th>Role(s)</th>
                <th className="main-content-table-action-column">Action</th>
              </tr>
            </thead>

            <tbody>
              {tblPaginationSlicedItems && tblPaginationSlicedItems.map((staffMember) => (
                <tr key={staffMember.id}>
                  <td>{staffMember.id}</td>
                  <td>{staffMember.username}</td>
                  <td>{staffMember.email}</td>
                  <td>{staffMember.address}</td>
                  <td>{staffMember.telephoneNumber}</td>
                  <td>{staffMember.roleNames.join(', ')}</td>
                  <td className="main-content-table-action-column">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(staffMember.id)}>
                      EDIT
                    </Button>{" "}

                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(staffMember.id)}>
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

export default StaffTabContent;



