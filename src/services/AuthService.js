import axios from "axios";
import { postRequest } from "./CommonServices/UnAuthenticatedApiService";

//API requests for /auth

//POST request
export const userLogin = async (requestData) => {
    const loggedUser = await postRequest("/auth/login", requestData);

    //store user details in session storage
    sessionStorage.setItem('token', loggedUser.token);
    sessionStorage.setItem('username', loggedUser.username);
    sessionStorage.setItem('user_id', loggedUser.userId);
    sessionStorage.setItem('user_role', JSON.stringify(loggedUser.roles)); // Store roles as a JSON string
    axios.defaults.headers.common['Authorization'] = `Bearer ${loggedUser.token}`;

    return loggedUser;
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
    return await postRequest("/auth/password-reset", requestData);
};