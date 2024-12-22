import {getAllRequest} from "./commonServices/UnAuthenticatedApiService";
import {deleteAuthenticatedRequest, getAllAuthenticatedRequest, getByIdAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./commonServices/AuthenticatedApiService";

//API requests for /category

//GET: getCategoryById
export const getCategoryById = async (id) =>{
    return await getByIdAuthenticatedRequest("/category", id);
};

//GET: getAllCaregories
export const getAllCategories = async () =>{
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

//GET: getAllCaregories with subCategory[] :UnAuthenticated
export const getAllCategoryWithSubCategory = async () => {
    return await getAllRequest("/category/subCategory");
};



