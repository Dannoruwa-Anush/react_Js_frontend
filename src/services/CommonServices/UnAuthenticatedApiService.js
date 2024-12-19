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

