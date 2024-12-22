import {deleteAuthenticatedRequest, getByIdAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./commonServices/AuthenticatedApiService";
import { getAllRequest } from "./commonServices/UnAuthenticatedApiService";
//API requests for /author

//GET: getAllAuthors : UnAuthenticated
export const getAllAuthors = async () => {
    return await getAllRequest("/author");
};

//GET: getAuthorById
export const getAuthorById = async (id) =>{
    return await getByIdAuthenticatedRequest("/author", id);
};

//DELETE : author
export const deleteAuthor = async (id) =>{
    return await deleteAuthenticatedRequest("/author", id)
};

//POST : author
export const saveAuthor = async (dataToSave) =>{
    return await postAuthenticatedRequest("/author", dataToSave)
};

//PUT : author
export const updateAuthor = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/author", id, dataToUpdate)
};

