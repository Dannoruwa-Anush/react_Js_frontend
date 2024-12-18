import AxioInstance from "../configurations/AxiosConfig";
//API requests for /author

//GET: getAllAuthors
export const getAllAuthors= async () =>{
    try {
        const response = await AxioInstance.get("/author");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

