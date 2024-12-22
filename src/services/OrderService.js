import {deleteAuthenticatedRequest, getAllAuthenticatedRequest, getAllByIdAuthenticatedRequest, getAllByRequestBodyAuthenticatedRequest, getByIdAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./commonServices/AuthenticatedApiService";

//API requests for /order

//GET: getOrderById
export const getOrderById = async (id) =>{
    return await getByIdAuthenticatedRequest("/order", id);
};

//PUT : updateOrderStatus
export const updateOrderStatus = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/order/updateOrderStatus", id, dataToUpdate)
};


//GET: getAllOrdersByUserId
export const getAllOrdersByUserId = async (id) => {
    return await getAllByIdAuthenticatedRequest("/order/customer", id);
};


//GET : getAllOrdersByOrderStatus
export const getAllOrdersByOrderStatus = async (requestData) => {
    return await getAllByRequestBodyAuthenticatedRequest("/order/orderStatus", requestData);
};


//GET : getAllOrdersByOrderDateAndStatus
export const getAllOrdersByOrderDateAndStatus = async (requestData) => {
    return await getAllByRequestBodyAuthenticatedRequest("/order/orderDateAndStatus", requestData);
};