import { createContext } from "react";
import { UserFactory } from "../factory/UserFactory";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";

type TypeUser = {
    user: User,
    create: () => Promise<void | boolean>
}

export const UserContext = createContext({} as TypeUser);

export const UserProvider = ({ children }) => {
    const user = UserFactory.startUserForm();
    const userService = new UserService();
    const create = async () => {
        const res = await userService.create({
            name: user.name.value,
            email: user.email.value,
            phone: user.phone.value,
            password: user.password.value,
        });
        if(res.success) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <UserContext.Provider value={{
            user,
            create
        }}>
            {children}
        </UserContext.Provider>
    )
}