import { useState, useEffect } from "react";
import playlistApi from "../apis/playlistApi"; // Import playlist API
import { Playlist } from "../types/typePlaylist";

// Kiểu dữ liệu trả về của custom hook `usePlaylists`
interface UsePlaylistsResult {
  playlists: Playlist[]; // Mảng chứa danh sách playlist
  loading: boolean; // Trạng thái đang tải dữ liệu
  error: string | null; // Lưu trữ thông báo lỗi nếu có
}

// Custom hook `usePlaylists` để lấy danh sách playlist theo user
const usePlaylists = (userId: number): UsePlaylistsResult => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]); // State chứa danh sách playlist
  const [loading, setLoading] = useState<boolean>(false); // State quản lý trạng thái loading
  const [error, setError] = useState<string | null>(null); // State quản lý thông báo lỗi

  // Hàm lấy danh sách playlist từ API theo userId
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    // Gọi API để lấy danh sách playlist của người dùng
    playlistApi
      .getPlaylistOfUser(userId)
      .then((response) => {
        console.log("API Response in usePlaylists hook:", response.data); // Log phản hồi API
        setPlaylists(response.data.content || []); // Cập nhật danh sách playlist vào state
      })
      .catch((err) => {
        console.error("Failed to fetch playlists:", err);
        setError("Failed to load playlists. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Tắt loading sau khi hoàn tất quá trình gọi API
      });
  }, [userId]);

  return { playlists, loading, error }; // Trả về kết quả của custom hook
};

export default usePlaylists;
