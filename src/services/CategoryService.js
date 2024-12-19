import {getAllRequest} from "./CommonServices/UnAuthenticatedApiService";
import {deleteAuthenticatedRequest, getAllAuthenticatedRequest} from "./CommonServices/AuthenticatedApiService";

//API requests for /category

//GET: getAllCaregories
export const getAllCaregories = async () =>{
    return await getAllAuthenticatedRequest("/category");
};

//DELETE : category
export const deleteCategory = async (id) =>{
    return await deleteAuthenticatedRequest("/category", id)
};

//GET: getAllCaregories with subCategory[]
export const getAllCategoryWithSubCategory = async () => {
    return await getAllRequest("/category/subCategory");
};



