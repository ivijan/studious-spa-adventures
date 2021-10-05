import { Role } from "./role.enum";

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role?: Role;
    token?: string;
}

export interface UserData extends User {
    password: string;
}
