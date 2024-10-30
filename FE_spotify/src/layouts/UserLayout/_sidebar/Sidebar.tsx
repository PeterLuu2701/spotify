import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import {
  Avatar,
  Button,
  Col,
  Popover,
  Row,
  Space,
  Typography,
} from "antd";
import { useModal } from "../../../globalContext/ModalContext";
import { useAppSelector } from "../../../redux/hooks";
import { TypePlaylistPost } from "../../../types/typePlaylist";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { createPlayList } from "../../../apis/apiPlayList/apiCreatePlayList";
import { useEffect, useState } from "react";
import { getPlaylistByUser } from "../../../apis/apiPlayList/apiGetPlayListByUser";
const { Title, Text } = Typography;

export default function Sidebar() {
  const { openModal, openPopover, popover } = useModal();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const playlists = useAppSelector((state) => state.playlist.playLists);
  const playListDetailById = useAppSelector(
    (state) => state.playlist.playListDetailById
  );
  const playlistCount = playlists.length;
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPlaylistByUser(currentUser?.user.userId));
  }, [playListDetailById, currentUser]);

  const handleCreatePlayList = async () => {
    const newPlaylist: TypePlaylistPost = {
      userId: currentUser.user.userId,
      imagePath:
        "https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg",
      playlistName: `Danh sách phát của tôi #${playlistCount + 1}`,
      description: "Your description here",
    };

    const result = await dispatch(createPlayList(newPlaylist));
    if (result) {
      navigate(`/play-list/${result.id}`);
      dispatch(getPlaylistByUser(currentUser?.user.userId));
    } else {
      console.log("Failed to create playlist.");
    }
  };

  return (
    <div className="sidebar mt-3 pl-3 mr-2" style={{ width: "300px" }}>
      <div className="sidebar-top mb-2">
        <button className="logo-spotify">
          <i className="fa-brands fa-spotify mr-2"></i>
          <span>Spotify</span>
        </button>
        <div className="flex justify-between items-center library mt-7">
            <NavLink
              to="/"
              className="flex items-center text-white no-underline hover:text-gray-400"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-house mr-2"></i>
              <span>Home</span>
            </NavLink>
            </div>
        {/* <NavLink
          to={"search"}
          className={({ isActive }) =>
            isActive ? "my-active btn-search" : "btn-search"
          }
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          Search
        </NavLink> */}
      </div>
      <div className="sidebar-bottom">
        <div>
          <div className="flex justify-between items-center library mb-7">
            <NavLink
              to="/genre"
              className="flex items-center text-white no-underline hover:text-gray-400"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-list mr-2"></i>
              <span>Phân loại</span>
            </NavLink>
          </div>

          <div className="flex justify-between items-center library mb-7">
            <div>
              <i className="fa-solid fa-lines-leaning"></i>Your Library
            </div>
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <div className="create-playlist ">
            {!currentUser ? (
              <div>
                <p className="font-bold">Create your first playlist</p>
                <p className="font-medium">It's easy, we'll help you</p>

                <Popover
                  style={{ backgroundColor: "blue", left: "10%" }}
                  content={<a onClick={popover}>Close</a>}
                  title={
                    <>
                      <p className="text-lg font-bold">Create a playlist</p>
                      <p>Log in to create and share playlists.</p>
                      <br />
                      <Button onClick={openModal}>Login</Button>
                    </>
                  }
                  trigger="click"
                  open={openPopover}
                  placement="rightTop"
                  onOpenChange={popover}
                >
                  <Button
                    type="primary"
                    className="btn-createPlaylist"
                    onClick={popover}
                  >
                    Create playlist
                  </Button>
                </Popover>
              </div>
            ) : (
              <div>
                <p className="font-bold mt-2 mb-4 ml-5 text-green-600">
                  Your Playlists
                </p>
                <ul>
                  {playlists.map((playlist: any) => (
                    <li
                      style={{
                        backgroundColor:
                          currentId === playlist.id
                            ? "rgba(255, 255, 255, 0.1)"
                            : "transparent", // Change the background color when the id matches
                        padding: "3px 10px",
                        borderRadius: "5px", // Add some rounding to the corners if desired
                        cursor: "pointer", // Change the cursor to pointer on hover
                      }}
                      key={playlist.id}
                      onClick={() => {
                        navigate(`./play-list/${playlist.id}`);
                        setCurrentId(playlist.id);
                      }}
                    >
                      <Row align="middle" style={{ marginBottom: "10px" }}>
                        <Col span={6}>
                          <Avatar
                            shape="square"
                            size={45}
                            src={playlist.imagePath}
                            alt="Playlist cover"
                          />
                        </Col>
                        <Col span={18}>
                          <Space direction="vertical">
                            <Title
                              style={{
                                color: "white",
                                margin: "0",
                                fontSize: "13px",
                                fontWeight: "bold",
                                lineHeight: "0.5",
                              }}
                            >
                              {playlist.playlistName}
                            </Title>
                            <Text
                              style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: "0",
                                lineHeight: "1",
                              }}
                            >
                              Danh sách phát • {currentUser.user?.name}
                            </Text>
                          </Space>
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
                <Button
                  type="primary"
                  className="btn-createPlaylist"
                  onClick={handleCreatePlayList}
                >
                  Create new playlist
                </Button>
              </div>
            )}
          </div>
          <div className="footer-sidebar-bottom">
            <span>Legal</span>
            <span>Safety & Privacy Center</span>
            <span>Privacy Policy</span>
            <span>Cookies</span>
            <span>About Ads</span>
            <span>Accessibility</span>
            <span>Cookies</span>
          </div>
          <div className="languages">
            <button className="btn-languages">
              <i className="fa-solid fa-earth-americas mr-2"></i>English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
