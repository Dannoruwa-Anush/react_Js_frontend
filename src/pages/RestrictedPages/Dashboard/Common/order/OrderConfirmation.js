const OrderConfirmation = () => {
    // Get username
    const username = sessionStorage.getItem("username");

    return (
        <div className="order-confirmation-container">
            <h5 className="order-confirmation-header">Order Confirmation</h5>
            <div className="order-confirmation-content">
                <p className="order-confirmation-greeting">
                    Dear <strong>{username}</strong>,
                </p>
                <p className="order-confirmation-text">
                    Thank you for your order with <strong>ABC Bookshop</strong>. We will promptly prepare your order and send you an email containing your payment details.
                </p>
                <p className="order-confirmation-link">
                    You may view the specifics of your order by following this link: <a href="#" className="order-confirmation-link-text">Link</a>.
                </p>
                <p className="order-confirmation-signoff">
                    Best regards,<br />
                    <strong>ABC Bookshop</strong>
                </p>
            </div>
        </div>
    );
}

export default OrderConfirmation;
