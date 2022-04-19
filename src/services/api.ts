import axios from "axios";

export const api = axios.create({
    baseURL: 'http://54.232.140.34:3000/'
})