import { TypeSong } from "./typeSong";
import { TypeUser } from "./typeUser";

export interface TypePlaylistPost {
    userId: number;          
    imagePath: string;       
    playlistName: string;            
    description: string;        
}
  
export interface Playlist {
  id: number;
  userId: number;
  imagePath: string;
  playlistName: string;
  description: string;
  createDate: string;
}

export interface GetPlaylistsResponse {
  content: Playlist[];
  message: string;
  date: string;
  statusCode: number;
}

export interface PlaylistDetail {
  id: number;
  userId: number;
  imagePath: string;
  playlistName: string;
  description: string;
  createDate: string;
  PlaylistSongs: PlaylistSong[];
  User: TypeUser;
}


export interface PlaylistSong {
  id: number;
  playlistId: number;
  songId: number;
  Song: TypeSong;
}

export interface songAddToPlaylist {
  songId :number,
  playlistId: number
}

export interface playlistUpdate{
  playlistName: string,
  description: string
}