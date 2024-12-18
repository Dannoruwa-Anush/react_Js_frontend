import AxioInstance from "../configurations/AxiosConfig";
//API requests for /auth

//POST request
export const userLogin = async (requestData) => {
    try {
        const response = await AxioInstance.post("/auth/login", requestData);
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