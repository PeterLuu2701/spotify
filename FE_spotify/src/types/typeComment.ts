import { TypeUser } from "./typeUser";

export interface TypeComment {
    userId: number;
    discussId: number;
    content: string;
    songId: number;
    discussDate: Date;
    replayDiscussId: null | string;
    User: TypeUser
}