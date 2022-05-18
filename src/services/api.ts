import axios from "axios";
import { parseCookies } from "nookies";

export const api = getAPIClient();

export function getAPIClient(ctx?: any) {
    const { 'nextauth.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://emlar-back.herokuapp.com/'
    })

    
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}