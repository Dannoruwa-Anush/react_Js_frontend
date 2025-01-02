import { postRequest, putRequest, loginRequest } from "./common-services/UnAuthenticatedApiService";

//API requests for /auth

//POST request
export const userLogin = async (requestData) => {
    return await loginRequest(requestData);
};

//POST request
export const userRegister = async (requestData) => {
    return await postRequest("/auth/register", requestData);
};


//POST request
export const userAccountRecovery = async (requestData) => {
    return await postRequest("/auth/userRecovery", requestData);
};


//PUT request
export const passwordReset = async (requestData) => {
    console.log(requestData);
    return await putRequest("/auth/password-reset", requestData.id, requestData);
};