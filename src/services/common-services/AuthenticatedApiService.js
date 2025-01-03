import AxioInstance from "../../configurations/AxiosConfig";

const token = sessionStorage.getItem("token");
if (token) {
    AxioInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Helper function for handling unauthorized errors
const handleUnauthorizedError = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_role");
    window.location.href = "/login";
};

// Set the Authorization header globally (only if token exists)

// Common REST Authenticated API requests
// GET All
export const getAllAuthenticatedRequest = async (path) => {
    try {
        const response = await AxioInstance.get(path);
        return response.data;
    } catch (error) {
        console.error(`(Authenticated) GET All Error for path ${path}:`, error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
            handleUnauthorizedError()
        };
        return [];
    }
};

// GET By Id
export const getByIdAuthenticatedRequest = async (path, id) => {
    try {
        const response = await AxioInstance.get(`${path}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`(Authenticated) GET By Id  ${id} Error for path ${path}: `, error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
            handleUnauthorizedError()
        };
        return {};
    }
};

// POST
export const postAuthenticatedRequest = async (path, postRequestData) => {
    try {
        const response = await AxioInstance.post(path, postRequestData);
        return response.data;
    } catch (error) {
        console.error(`(Authenticated) POST Error for path ${path}:`, error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
            handleUnauthorizedError()
        };
        throw error;
    }
};

// PUT
export const putAuthenticatedRequest = async (path, id, putRequestData) => {
    try {
        const response = await AxioInstance.put(`${path}/${id}`, putRequestData);
        return response.data;
    } catch (error) {
        console.error(`(Authenticated) PUT By Id  ${id} Error for path ${path}: `, error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
            handleUnauthorizedError()
        };
        throw error;
    }
};

// DELETE
export const deleteAuthenticatedRequest = async (path, id) => {
    try {
        const response = await AxioInstance.delete(`${path}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`(Authenticated) DELETE By Id  ${id} Error for path ${path}: `, error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
            handleUnauthorizedError()
        };
        throw error;
    }
};


//Custom REST APIs
// GET All
export const getAllByIdAuthenticatedRequest = async (path, id) => {
    try {
        const response = await AxioInstance.get(`${path}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`(Authenticated) GET All By Id ${id} Error for path ${path}:`, error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
            handleUnauthorizedError()
        };
        return [];
    }
};

// (Post Method) : GET All : with RequestBody
export const getAllByRequestBodyAuthenticatedRequest = async (path, postRequestData) => {
    try {
        const response = await AxioInstance.post(path, postRequestData);
        return response.data;
    } catch (error) {
        console.error(`(Authenticated) GET Error for path ${path}:`, error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
            handleUnauthorizedError()
        };
        return [];
    }
};


// GET By Id
export const getFileByIdRequest = async (path1, id, path2) => {
    try {
        const response = await AxioInstance.get(`${path1}/${id}/${path2}`, {
            responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `order-${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Error downloading the PDF:", error);
    }
};
