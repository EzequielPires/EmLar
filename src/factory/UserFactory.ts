import { User } from "../entities/User";
import useForm from "../hooks/useForm";

export class UserFactory {
    public static startUserForm(): User {
        const user = new User();
        user.name = useForm('name');
        user.email = useForm('email');
        user.password = useForm('password');
        user.phone = useForm('phone');

        return user;
    }
}