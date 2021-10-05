export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user',
    token?: string;
}

export interface UserData extends User {
    password: string;
}
