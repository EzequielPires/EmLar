import { api } from "./api";

export class UserService {
    async create(data) {
        const user:any = await api.post('/users', data);
        console.log(user);
        return user.data;
    }
}