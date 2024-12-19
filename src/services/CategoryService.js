import {getAllRequest} from "./CommonServices/UnAuthenticatedApiService";
import {deleteAuthenticatedRequest, getAllAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./CommonServices/AuthenticatedApiService";

//API requests for /category

//GET: getAllCaregories
export const getAllCaregories = async () =>{
    return await getAllAuthenticatedRequest("/category");
};

//DELETE : category
export const deleteCategory = async (id) =>{
    return await deleteAuthenticatedRequest("/category", id)
};

//POST : category
export const saveCategory = async (dataToSave) =>{
    return await postAuthenticatedRequest("/category", dataToSave)
};

//PUT : category
export const updateCategory = async (id, dataToSave) =>{
    return await putAuthenticatedRequest("/category", id, dataToSave)
};

//GET: getAllCaregories with subCategory[]
export const getAllCategoryWithSubCategory = async () => {
    return await getAllRequest("/category/subCategory");
};



