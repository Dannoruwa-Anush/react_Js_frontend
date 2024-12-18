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
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return {};
    }
};