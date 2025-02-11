import axios from 'axios'

const baseApi = axios.create({
  baseURL : "http://localhost:9000/api",
  withCredentials : true,
});

export default baseApi