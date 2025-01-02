import {deleteAuthenticatedRequest, getAllAuthenticatedRequest, getByIdAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./common-services/AuthenticatedApiService";

//API requests for /user/staff

//GET: getAllStaffMembers 
export const getAllStaffMembers = async () => {
    return await getAllAuthenticatedRequest("/user/staff");
};

//GET: getStaffMemberById
export const getStaffMemberById = async (id) =>{
    return await getByIdAuthenticatedRequest("user/staff", id);
};

//DELETE : deleteStaffMember
export const deleteStaffMember = async (id) =>{
    return await deleteAuthenticatedRequest("/user/staff", id)
};

//POST : StaffMember
export const saveStaffMember = async (dataToSave) =>{
    return await postAuthenticatedRequest("/user/add-staff", dataToSave)
};

//PUT : updateStaffMember
export const updateStaffMember = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/user/staff", id, dataToUpdate)
};

