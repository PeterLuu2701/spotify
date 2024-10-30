import api from "./apiUtil";

// Định nghĩa các kiểu dữ liệu DTO (Data Transfer Object) tương ứng với backend
interface CreatePlayListDto {
  userId: number;
  imagePath: string;
  playlistName: string;
  description: string;
  createDate: Date;
}

interface UpdatePlayListDto {
  playlistName: string;
  description: string;
}

interface AddSongsToPlaylistDto {
  playlistId: number;
  songId: number[]; // Một mảng chứa ID của các bài hát muốn thêm
}

// Định nghĩa kiểu dữ liệu trả về
interface GetPlaylistsResponse {
  content: Playlist[];
  message: string;
  date: string;
  statusCode: number;
}

interface Playlist {
  id: number;
  userId: number;
  imagePath: string;
  playlistName: string;
  description: string;
  createDate: string;
}

// Playlist API service
const playlistApi = {
  // 1. Lấy danh sách tất cả các playlist
  getAllPlaylists: () => {
    return api.get("/get-all-playlist");
  },

  // 2. Lấy danh sách playlist của một người dùng cụ thể
  getPlaylistOfUser: (userId: number) => {
    return api.get<GetPlaylistsResponse>(`/get-playlist-of-user?id=${userId}`);
  },

  // 3. Tạo một playlist mới
  createPlaylist: (data: CreatePlayListDto) => {
    return api.post("/add-playlist", data);
  },

  // 4. Thêm bài hát vào một playlist
  addSongToPlaylist: (data: AddSongsToPlaylistDto) => {
    return api.post("/add-song-to-playlist", data);
  },

  // 5. Lấy chi tiết các bài hát trong một playlist
  getSongInPlaylist: (playlistId: number) => {
    return api.get(`/get-song-in-playlist/${playlistId}`);
  },

  // 6. Chỉnh sửa một playlist
  editPlaylist: (playlistId: number, data: UpdatePlayListDto) => {
    return api.put(`/edit-playlist/${playlistId}`, data);
  },

  // 7. Xóa một playlist
  deletePlaylist: (playlistId: number) => {
    return api.delete(`/remove-playlist/${playlistId}`);
  },
};

export default playlistApi;
