import axios from "axios";

export const api = axios.create({
    baseURL: 'https://emlar-database.herokuapp.com/'
})