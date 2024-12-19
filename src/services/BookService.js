import { getAllRequest, getByIdRequest, getAllByIdRequest } from "./CommonServices/UnAuthenticatedApiService";

//API requests for /book

//GET: getAllBooks
export const getAllBooks = async () => {
    return await getAllRequest("/book");
};

//GET: getBookById
export const getBookById = async (id) => {
    return await getByIdRequest("/book", id);
};

//GET: getAllBooksByAuthorId
export const getAllBooksByAuthorId = async (authorId) => {
    return await getAllByIdRequest("/book/author", authorId);
};


//GET: getAllBooksByCategoryId
export const getAllBooksByCategoryId = async (categoryId) => {
    return await getAllByIdRequest("/book/category", categoryId);
};


//GET: getAllBooksBySubCategoryId
export const getAllBooksBySubCategoryId = async (subCategoryId) => {
    return await getAllByIdRequest("/book/subCategory", subCategoryId);
};