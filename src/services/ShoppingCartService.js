import AxioInstance from "../configurations/AxiosConfig";

//API requests for /order/getShoppingCartTotal
//POST request
export const getShoppingCartTotal = async (requestData)=>{
    try {
        const response = await AxioInstance.post("/order/getShoppingCartTotal", requestData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


