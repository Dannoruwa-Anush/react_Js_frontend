import { getAllAuthenticatedRequest} from "./CommonServices/AuthenticatedApiService";

//API requests for /role/staff

//GET: getAllStaffRoles 
export const getAllStaffRoles = async () => {
    return await getAllAuthenticatedRequest("/role/staff");
};
