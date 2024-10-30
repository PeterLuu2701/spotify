export interface TypeSong {
    songId: number;
    userId: number;
    genreId: number;
    songName: string;
    viewer: number;
    duration: string;
    popular: boolean;
    description: string;
    songImage: string;
    publicDate: Date;
    filePath: string;
    discussQuality: number;
}