import { getAllRequest, getByIdRequest, getAllByIdRequest } from "./common-services/UnAuthenticatedApiService";
import {deleteAuthenticatedRequest, postAuthenticatedRequest, putAuthenticatedRequest} from "./common-services/AuthenticatedApiService";
//API requests for /book

//GET: getAllBooks :UnAuthenticated
export const getAllBooks = async () => {
    return await getAllRequest("/book");
};

//GET: getBookById :UnAuthenticated
export const getBookById = async (id) => {
    return await getByIdRequest("/book", id);
};

//GET: getAllBooksByAuthorId :UnAuthenticated
export const getAllBooksByAuthorId = async (authorId) => {
    return await getAllByIdRequest("/book/author", authorId);
};

//GET: getAllBooksByCategoryId :UnAuthenticated
export const getAllBooksByCategoryId = async (categoryId) => {
    return await getAllByIdRequest("/book/category", categoryId);
};

//GET: getAllBooksBySubCategoryId :UnAuthenticated
export const getAllBooksBySubCategoryId = async (subCategoryId) => {
    return await getAllByIdRequest("/book/subCategory", subCategoryId);
};

//DELETE : book
export const deleteBook = async (id) =>{
    return await deleteAuthenticatedRequest("/book", id)
};

//POST : book
export const saveBook = async (dataToSave) =>{
    return await postAuthenticatedRequest("/book", dataToSave)
};

//PUT : book (withCoverImage)
export const updateBookWithCoverImage = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/book/with-cover-image", id, dataToUpdate)
};

//PUT : book (withOutCoverImage)
export const updateBookWithOutCoverImage = async (id, dataToUpdate) =>{
    return await putAuthenticatedRequest("/book/without-cover-image", id, dataToUpdate)
};
