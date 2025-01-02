import {postRequest} from "./common-services/UnAuthenticatedApiService";
import { putAuthenticatedRequest, getFileByIdRequest } from "./common-services/AuthenticatedApiService";

//API requests for /trade

//POST request
export const getShoppingCartTotal = async (requestData)=>{
    return await postRequest("/trade/getShoppingCartTotal", requestData);
};

//PUT : updateOrderStatus
export const updateTradeStatus = async (id, dataToUpdate) => {
    return await putAuthenticatedRequest("/trade/updateTradeStatus", id, dataToUpdate)
};

//Get: Order Bill
export const getTradeBillById = async (id) => {
    return await getFileByIdRequest("/trade", id, "pdfTradeBill");
};