import { createContext, useState } from "react";

type Alert = {
    show: boolean;
    type: string;
    message: string;
    alertShow: (type, message) => void;
}

export const AlertContext = createContext({} as Alert);

export function AlertProvider({ children }) {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const alertShow = (type, message) => {
        setMessage(message);
        setType(type);
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 7000);
    }
    return (
        <AlertContext.Provider value={{
            show,
            type,
            message,
            alertShow,
        }}>
            {children}
        </AlertContext.Provider>
    )
}