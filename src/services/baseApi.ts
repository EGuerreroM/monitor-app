import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://sistema-de-riego-iot.herokuapp.com/api/',
});

export default baseApi;
