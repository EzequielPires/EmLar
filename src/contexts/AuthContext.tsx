import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { api } from "../services/api";
import { recoverUserInformation, signInRequest } from "../services/Auth";

type TypeAuth = {
    user,
    email,
    password,
    signIn: () => Promise<null | boolean>,
}

export const AuthContext = createContext({} as TypeAuth);

export function AuthProvider({children}) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const email = useForm('email');
    const password = useForm('password');

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();
        if (token) {
            recoverUserInformation().then((response: any) => {
                setUser(response.user)
            })
        }
    }, [])

    const verify = () => {
        const { 'nextauth.token': token } = parseCookies();
        const { 'user': user } = parseCookies();
        if (token && user) {
            setUser(null);
            destroyCookie(null, 'nextauth.token', { path: '/', });
            destroyCookie(null, 'user', { path: '/', });
        }
    }

    const setTokenCookies = (token) => setCookie(undefined, 'nextauth.token', token, { maxAge: 60 * 60 * 1, path: '/', })
    const setUserCookies = (user) => setCookie(undefined, 'user', user, { maxAge: 60 * 60 * 1, path: '/', });

    async function signIn() {
        const {user, token} = await signInRequest(email.value, password.value);
        if(user && token) {
            setTokenCookies(token);
            setUserCookies(JSON.stringify(user));
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            router.push('/admin');
            return true;
        } else {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            email,
            password,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}