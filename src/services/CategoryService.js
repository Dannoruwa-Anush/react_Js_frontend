import {getAllRequest} from "./CommonServices/UnAuthenticatedApiService";
import {deleteAuthenticatedRequest, getAllAuthenticatedRequest, getByIdAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./CommonServices/AuthenticatedApiService";

//API requests for /category

//GET: getCategoryById
export const getCaregoryById = async (id) =>{
    return await getByIdAuthenticatedRequest("/category", id);
};

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
export const updateCategory = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/category", id, dataToUpdate)
};

//GET: getAllCaregories with subCategory[]
export const getAllCategoryWithSubCategory = async () => {
    return await getAllRequest("/category/subCategory");
};



