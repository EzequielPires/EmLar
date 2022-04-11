import { useRouter } from "next/router";
import { createContext, useState } from "react";
import useForm from "../hooks/useForm";
import { signInRequest } from "../services/Auth";

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

    async function signIn() {
        const {user, token} = await signInRequest(email.value, password.value);
        if(user && token) {
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