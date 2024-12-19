import {getAllRequest} from "./CommonServices/UnAuthenticatedApiService";

//API requests for /category

//GET: getAllCaregories
export const getAllCategoryWithSubCategory = async () => {
    return await getAllRequest("/category/subCategory");
};



