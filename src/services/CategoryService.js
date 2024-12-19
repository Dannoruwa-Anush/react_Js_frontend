import {getAllRequest} from "./CommonServices/UnAuthenticatedApiService";
import {getAllAuthenticatedRequest} from "./CommonServices/AuthenticatedApiService";

//API requests for /category

//GET: getAllCaregories
export const getAllCaregories = async () =>{
    return await getAllAuthenticatedRequest("/category");
};

//GET: getAllCaregories with subCategory[]
export const getAllCategoryWithSubCategory = async () => {
    return await getAllRequest("/category/subCategory");
};



