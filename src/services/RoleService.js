import { getAllAuthenticatedRequest} from "./common-services/AuthenticatedApiService";

//API requests for /role/staff

//GET: getAllStaffRoles 
export const getAllStaffRoles = async () => {
    return await getAllAuthenticatedRequest("/role/staff");
};
