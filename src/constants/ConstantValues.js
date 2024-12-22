//enums

//define an enum and export it
export const UserRole = Object.freeze({
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    CASHIER: "CASHIER",
    CUSTOMER: "CUSTOMER",
});

export const OrderStatus = Object.freeze({
    PENDING: "PENDING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
});