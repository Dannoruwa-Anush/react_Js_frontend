import { getAllRequest } from "./CommonServices/UnAuthenticatedApiService";
//API requests for /author

//GET: getAllAuthors
export const getAllAuthors = async () => {
    return await getAllRequest("/author");
};

