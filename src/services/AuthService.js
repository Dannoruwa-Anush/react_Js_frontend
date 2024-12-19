import axios from 'axios';
import AxioInstance from "../configurations/AxiosConfig";
//API requests for /auth

//POST request
export const userLogin = async (requestData) => {
    try {
        const response = await AxioInstance.post("/auth/login", requestData);

        sessionStorage.setItem('token',response.data.token);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('user_id',response.data.id);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//POST request
export const userRegister = async (requestData) => {
    try {
        const response = await AxioInstance.post("/auth/register", requestData);
        return response.data;
    } catch (error) {   
        console.log(error);
        throw error;
    }
};


//POST request
export const userAccountRecovery = async (requestData) => {
    try {
        const response = await AxioInstance.post("/auth/userRecovery", requestData);
        return response.data;
    } catch (error) {   
        console.log(error);
        throw error;
    }
};


//PUT request
export const passwordReset = async (requestData) => {
    try {
        const response = await AxioInstance.put("/auth/password-reset", requestData);
        return response.data;
    } catch (error) {   
        console.log(error);
        throw error;
    }
};