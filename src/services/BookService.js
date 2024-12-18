import AxioInstance from "../configurations/AxiosConfig";
//API requests for /book

//GET: getAllBooks
export const getAllBooks = async () =>{
    try {
        const response = await AxioInstance.get("/book");
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

//GET: getBookById
export const getBookById= async (id) =>{
    try {
        const response = await AxioInstance.get("/book/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        return {};
    }
};


//GET: getAllBooksByAuthorId
export const getAllBooksByAuthorId = async (authorId) =>{
    try {
        const response = await AxioInstance.get("/book/author/" + authorId);
        return response.data;
    } catch (error) {
        console.log(error);
        return {};
    }
};


//GET: getAllBooksByCategoryId
export const getAllBooksByCategoryId = async (categoryId) =>{
    try {
        console.log(categoryId);

        const response = await AxioInstance.get("/book/category/" + categoryId);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


//GET: getAllBooksBySubCategoryId
export const getAllBooksBySubCategoryId = async (subCategoryId) =>{
    try {
        const response = await AxioInstance.get("/book/subCategory" + subCategoryId);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};