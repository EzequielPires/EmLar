import axios from "axios";
import { parseCookies } from "nookies";

export const api = getAPIClient();

export function getAPIClient(ctx?: any) {
    const { 'nextauth.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3000'
    })

    
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}