import AxioInstance from "../configurations/AxiosConfig";
//API requests for /book

//POST request
export const userLogin = async (requestData)=>{
    try {
        const response = await AxioInstance.post("/auth/login", requestData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};