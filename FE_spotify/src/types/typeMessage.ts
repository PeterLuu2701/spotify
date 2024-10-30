export interface TypeMessage {
    idSender: number;
    contentMess: string;
    timeSend: Date;
    roomChat: string;
}

export interface Sender {
    userId: number;
    account: string;
    name: string;
    nationality: string;
    chanalName: string;
    avatar: string;
    desciption: string;
    refreshToken: string;
    password: string;
    banner: string;
    role: string;
}