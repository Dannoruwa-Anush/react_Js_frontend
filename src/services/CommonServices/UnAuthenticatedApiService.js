import AxioInstance from "../../configurations/AxiosConfig";

// Common REST API requests
// GET All
export const getAllRequest = async (path) => {
    try {
        const response = await AxioInstance.get(path);
        return response.data;
    } catch (error) {
        console.error(`GET All Error for path ${path}:`, error.response ? error.response.data : error.message);
        return [];
    }
};

// GET By Id
export const getByIdRequest = async (path, id) => {
    try {
        const response = await AxioInstance.get(`${path}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`GET By Id  ${id} Error for path ${path}: `, error.response ? error.response.data : error.message);
        return {};
    }
};

// POST
export const postRequest = async (path, postRequestData) => {
    try {
        const response = await AxioInstance.post(path, postRequestData);
        return response.data;
    } catch (error) {
        console.error(`POST Error for path ${path}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

// PUT (only for password-reset)
export const putRequest = async (path, id, putRequestData) => {
    try {
        const response = await AxioInstance.put(`${path}/${id}`, putRequestData);
        return response.data;
    } catch (error) {
        console.error(`PUT By Id  ${id} Error for path ${path}: `, error.response ? error.response.data : error.message);
        throw error;
    }
};

//Custom REST APIs
// GET All
export const getAllByIdRequest = async (path, id) => {
    try {
        const response = await AxioInstance.get(`${path}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`GET All By Id ${id} Error for path ${path}:`, error.response ? error.response.data : error.message);
        return [];
    }
};

//Login
export const loginRequest = async (postRequestData) => {
    try {
        const response = await AxioInstance.post("/auth/login", postRequestData);

        console.log("login : " + response);

        //store user details in session storage
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('user_id', response.data.userId);
        sessionStorage.setItem('user_role', JSON.stringify(response.data.roles)); // Store roles as a JSON string
        AxioInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        return response.data;
    } catch (error) {
        console.error(`POST Error for path /auth/login:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

