import { default as axios } from "axios";
import { API_BASE_URL } from "./Config";

const AxioInstance = axios.create({
    baseURL : API_BASE_URL,
});

export default AxioInstance;