export interface CreateUser {
    name: string;
    email: string;
    password: string;
    phone: number;
}

export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
    phone?: number;
}

export interface PathParam {
    id: string;
}
