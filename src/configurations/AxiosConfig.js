import { default as axios } from "axios";

const AxioInstance = axios.create({
    baseURL : "http://localhost:9090",
});

export default AxioInstance;