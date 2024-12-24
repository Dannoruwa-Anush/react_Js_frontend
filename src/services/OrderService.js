import { getAllByIdAuthenticatedRequest, getAllByRequestBodyAuthenticatedRequest, getByIdAuthenticatedRequest, postAuthenticatedRequest } from "./commonServices/AuthenticatedApiService";

//API requests for /order

//GET: getOrderById
export const getOrderById = async (id) => {
    return await getByIdAuthenticatedRequest("/order", id);
};

//POST: saveOrder
export const saveOrder = async (dataToSave) => {
    try {
        const response = await postAuthenticatedRequest("/order", dataToSave);

        //reset shoppingcart in session
        sessionStorage.removeItem("cart");

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//GET: getAllOrdersByUserId
export const getAllOrdersByUserId = async (id) => {
    return await getAllByIdAuthenticatedRequest("/order/customer", id);
};


//GET : getAllOrdersByOrderStatus
export const getAllOrdersByOrderStatus = async (requestData) => {
    return await getAllByRequestBodyAuthenticatedRequest("/order-Status", requestData);
};


//GET : getAllOrdersByOrderDateAndStatus
export const getAllOrdersByOrderDateAndStatus = async (requestData) => {
    return await getAllByRequestBodyAuthenticatedRequest("/order-Date-And-Status", requestData);
};
