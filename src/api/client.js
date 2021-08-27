import axios from "axios";

const axiosObj = axios.create({
  baseURL: "https://books-store-api-1.herokuapp.com/api",
});

export default axiosObj;
