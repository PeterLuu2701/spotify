export type TypeUser = {
    userId: number;
    account: string;
    name: string;
    nationality: string;
    chanalName: string;
    avatar: string;
    desciption: null | string;
    refreshToken: string;
    banner: string;
    role: Role;
}
export enum Role {
    Admin = "admin",
    Singer = "Singer",
    User = "user",
}