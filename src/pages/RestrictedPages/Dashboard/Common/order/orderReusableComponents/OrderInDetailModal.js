import {
  getOrderById,
  updateOrderStatus,
} from "../../../../../../services/OrderService";
import { UserRole } from "./../../../../../../constants/ConstantValues";
import { OrderStatus } from "./../../../../../../constants/ConstantValues";
import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Table } from 'react-bootstrap';

const OrderInDetailModal = ({ show, onClose, rowId }) => {
  //API responses
  const [orderDetails, setOrderDetails] = useState(null); // Initialize with null to check for data fetching
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get roles from sessionStorage
  //Process btn should not view for CUSTOMER or CASHIER
  const roles = sessionStorage.getItem("user_role");

  // Memoize fetchOrderDetails using useCallback
  const fetchOrderDetails = useCallback(async () => {
    if (rowId) {
      const data = await getOrderById(rowId);
      console.log(data);
      setOrderDetails(data);
    }
  }, [rowId]); // Memoize it based on rowId

  // Fetch data when the modal is opened or when rowId changes
  useEffect(() => {
    if (show) {
      fetchOrderDetails();
    }
  }, [show, fetchOrderDetails]); // Use fetchOrderDetails here as it's now memoized

  // Check if the user is a customer or cashier
  const shouldHideProcessButton = roles.includes(UserRole.CUSTOMER) || roles.includes(UserRole.CASHIER);

  //Handle order process
  const handleOrderProcess = async () => {
    // Determine the new order status based on current order status
    let newStatus;
    if (orderDetails.status === OrderStatus.PENDING) {
      newStatus = OrderStatus.SHIPPED;
    } else if (orderDetails.status === OrderStatus.SHIPPED) {
      newStatus = OrderStatus.DELIVERED;
    } else {
      setErrorMessage("Invalid order status transition");
      return;
    }

    // Attempt to update the order status
    try {
      const response = await updateOrderStatus(rowId, { newStatus });

      // If the update is successful, display a success message
      setSuccessMessage(response.message || "Order processed successfully");
      setErrorMessage(""); // Clear any previous errors

      // Optionally, hide the success message after a brief delay
      setTimeout(() => {
        setSuccessMessage(""); // Clear the message after 1 second
      }, 1000);
    } catch (error) {
      // Display a relevant error message based on the error response
      const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred";
      setErrorMessage(errorMsg);
      setSuccessMessage(""); // Clear any previous success message
    }
  };


  return (
    <div>
      {/* [Start] : Modal window */}
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderDetails ? (
            <>
              {/* [Start] : Order No */}
              <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
                <h5 style={{ color: '#495057', fontWeight: 'bold' }}>Order No : #{orderDetails.id}</h5>
              </div>
              {/* [End]   : Order No */}

              {/* [Start] : User details */}
              <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
                <h5 style={{ textAlign: 'center', color: '#495057', fontWeight: 'bold' }}>Delivery Information</h5>
                <Table bordered striped hover responsive>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{orderDetails.customer.username}</td>
                    </tr>

                    <tr>
                      <th>Email</th>
                      <td>{orderDetails.customer.email}</td>
                    </tr>

                    <tr>
                      <th>Address</th>
                      <td>{orderDetails.customer.address}</td>
                    </tr>

                    <tr>
                      <th>Telephone</th>
                      <td>{orderDetails.customer.telephoneNumber}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {/* [End] : User details */}

              {/* [Start] : Order details */}
              <div style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
                <h5 style={{ textAlign: 'center', color: '#495057', fontWeight: 'bold' }}>Order Details</h5>
                <Table bordered striped hover responsive>
                  <thead>
                    <tr>
                      <th>Item No</th>
                      <th>Title</th>
                      <th>Unit Price (Rs.)</th>
                      <th>Quantity</th>
                      <th>Sub Total (Rs.)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderDetails.orderBooks.map((orderBook) => (
                      <tr key={orderBook.book.id}>
                        <td>{orderBook.book.id}</td>
                        <td>{orderBook.book.title}</td>
                        <td>{orderBook.book.unitPrice}</td>
                        <td>{orderBook.quantity}</td>
                        <td>{orderBook.subTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/* [End] : Order details */}

              {/* [Start] : Display Total amount */}
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', textAlign: 'right' }}>
                <span style={{ fontWeight: 'bold', color: 'red' }}>Total: Rs. {orderDetails.totalAmount}</span>
              </div>
              {/* [End] : Display Total amount */}

              {/* [Start] : Shipped btn: (From pending) | Delivered btn: (From shipped) */}
              <div className="d-flex justify-content-end" style={{ marginTop: '20px' }}>
                <Button variant="secondary" onClick={onClose} style={{ marginRight: '10px' }}>
                  Close
                </Button>

                {/*This btn should not view for CUSTOMER or CASHIER*/}
                {!shouldHideProcessButton && (
                  <Button variant="primary" onClick={handleOrderProcess}>
                    Process
                  </Button>
                )}
              </div>
              {/* [End] : Shipped btn: (From pending) | Delivered btn: (From shipped) */}

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
            </>
          ) : (
            <p>No order details available.</p>
          )}
        </Modal.Body>
      </Modal>
      {/* [End] : Modal window */}
    </div>
  );
};

export default OrderInDetailModal;
