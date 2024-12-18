import AxioInstance from "../configurations/AxiosConfig";

//API requests for /category

//GET: getAllAuthors
export const getAllCategoryWithSubCategory= async () =>{
    try {
        const response = await AxioInstance.get("/category/subCategory");
        return response.data;
    } catch (error) {
        return [];
    }
};

