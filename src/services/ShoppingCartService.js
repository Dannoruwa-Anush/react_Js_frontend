import { postRequest} from "./CommonServices/UnAuthenticatedApiService";

//API requests for /order/getShoppingCartTotal
//POST request
export const getShoppingCartTotal = async (requestData)=>{
    return await postRequest("/order/getShoppingCartTotal", requestData);
};


