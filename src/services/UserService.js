import {getByIdAuthenticatedRequest, putAuthenticatedRequest} from "./commonServices/AuthenticatedApiService";

//API requests for /user

//GET: getUserById
export const getUserById = async (id) =>{
    return await getByIdAuthenticatedRequest("user", id);
};

//PUT : updateUser
export const updateUser = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/user", id, dataToUpdate)
};

