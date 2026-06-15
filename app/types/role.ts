export interface Role {
    id: string;
    name: string;
    description: string;
    pages?: string[];
}

export interface UserRole {
    id: string;
    userId: string;
    roleId: string;
}
