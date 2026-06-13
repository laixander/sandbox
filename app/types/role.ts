export interface Role {
    id: string;
    name: string;
    description: string;
}

export interface UserRole {
    id: string;
    userId: string;
    roleId: string;
}
