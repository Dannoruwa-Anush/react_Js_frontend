import {deleteAuthenticatedRequest, getAllAuthenticatedRequest, getByIdAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./CommonServices/AuthenticatedApiService";

//API requests for /subCategory

//GET: getsubCategoryById
export const getSubCategoryById = async (id) =>{
    return await getByIdAuthenticatedRequest("/subCategory", id);
};

//GET: getAllSubCaregories
export const getAllSubCategories = async () =>{
    return await getAllAuthenticatedRequest("/subCategory");
};

//DELETE : subCategory
export const deleteSubCategory = async (id) =>{
    return await deleteAuthenticatedRequest("/subCategory", id)
};

//POST : subCategory
export const saveSubCategory = async (dataToSave) =>{
    return await postAuthenticatedRequest("/subCategory", dataToSave)
};

//PUT : category
export const updateSubCategory = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/subCategory", id, dataToUpdate)
};


