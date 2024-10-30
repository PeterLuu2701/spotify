export interface TypeListFriend {
    id: number;
    userId: number;
    friendId: number;
    roomChat: string;
    User_ListFriends_friendIdToUser: IsFriend;
}

export interface IsFriend {
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