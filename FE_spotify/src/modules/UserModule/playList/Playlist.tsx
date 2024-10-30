import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  Avatar,
  Row,
  Col,
  Space,
  Button,
  Typography,
  Input,
  Dropdown,
  Menu,
  Modal,
  Form,
} from "antd";
import {
  PlayCircleOutlined,
  EllipsisOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  UserOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { fetchAndSetAllSongs } from "../../../apis/apiGetAllSongs";
import { AppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { TypeSong } from "../../../types/typeSong";
import moment from "moment";
import { fetchAndSetSongGenre } from "../../../apis/apiGetSongGenre";
import { TypeGenre } from "../../../types/typeGenre";
import { TypeUser } from "../../../types/typeUser";
import { apiGetUser } from "../../../apis/apiGetUser";
import { getPlaylistById } from "../../../apis/apiPlayList/apiGetPlaylistById";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../globalContext/GlobalContext";
import { PlaylistSong } from "../../../types/typePlaylist";
import "./Playlist.css";
import { addSongToPlaylist } from "../../../apis/apiPlayList/apiAddSongToPlaylist";
import { editPlaylist } from "../../../apis/apiPlayList/apiEditPlaylist";
import { deletePlaylist } from "../../../apis/apiPlayList/apiDeletePlaylist";

const { Title, Text } = Typography;

const PlaylistComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user")!)?.user;
  const { songLists, songGenre } = useAppSelector((state) => state.song);
  const { playListDetailById } = useAppSelector((state) => state.playlist);
  const navigate = useNavigate();

  const { id } = useParams();
  const [users, setUsers] = useState<TypeUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setIdMusic } =  useGlobalContext();
  const [isVisible, setIsVisible] = useState(true);
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<
    number | null
  >(null);
  // const [songQueue, setSongQueue] = useState<number[]>([]);

  const callApiGetUser = async () => {
    const result = await apiGetUser();
    setUsers(Array.isArray(result) ? result : [result]);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
    callApiGetUser();
  }, []);

  useEffect(() => {
    dispatch(getPlaylistById(id));
    dispatch(fetchAndSetAllSongs());
    dispatch(fetchAndSetSongGenre());
    setIsVisible(true);
    setSearchQuery("");
  }, [id, dispatch]);

  useEffect(() => {
    if (isModalVisible && playListDetailById) {
      form.setFieldsValue({
        playlistName: playListDetailById.playlistName || "",
        description: playListDetailById.description || "",
      });
    }
  }, [isModalVisible, playListDetailById, form]);

  const handleSave = () => {
    const values = form.getFieldsValue();
    if (values) {
      const playlistUpdate = {
        playlistName: values.playlistName,
        description: values.description,
      };
      dispatch(editPlaylist(playListDetailById.id, playlistUpdate));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setSearchQuery("");
    setIsVisible(false);
  };

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleAddSongToPlayist = (songId: number, playlistId: number) => {
    const songAdd = {
      playlistId,
      songId,
    };
    dispatch(addSongToPlaylist(songAdd));
  };

  const handleDeleteFromPlaylist = (songId: number) => {
    console.log(songId);
  };

  const handleMenuClick = async (e: any) => {
    if (e.key === "edit") {
      setIsModalVisible(true);
    } else if (e.key === "delete") {
      const result = await dispatch(deletePlaylist(playListDetailById.id));
      if (result.id == id) {
        navigate("/");
      }
    }
  };

  const handlePlayMusic = (id: number) => {
    setCurrentPlayingSongId(id);
    setIdMusic(String(id));
  };

  const handlePlayPlaylist = () => {
    const allIds = playListDetailById.PlaylistSongs?.map((song) => song.songId); // Lấy tất cả các id
    if (allIds && allIds.length > 0) {
      // setSongQueue(allIds); 
      // setCurrentPlayingSongId(allIds[0]); 
      setIdMusic(String(allIds[0]));
      // funcSongEndProps(handleSongEnd)
    }
  };

  // const handleSongEnd = () => {
  //   if (songQueue.length > 0) {
  //     const newQueue = songQueue.slice(1); 
  //     setSongQueue(newQueue);
  //     if (newQueue.length > 0) {
  //       setCurrentPlayingSongId(newQueue[0]);
  //     } else {
  //       setCurrentPlayingSongId(null);
  //     }
  //   }
  // };

  // const currentSong = playListDetailById.PlaylistSongs?.find(
  //   (song) => song.songId === currentPlayingSongId
  // );

  // console.log(currentSong);
  

  const menu = (
    <Menu onClick={handleMenuClick} style={{ backgroundColor: "#3f3f3f" }}>
      <Menu.Item style={{ color: "white" }} key="edit" icon={<EditOutlined />}>
        Sửa thông tin chi tiết
      </Menu.Item>
      <Menu.Item
        style={{ color: "white" }}
        key="delete"
        icon={<DeleteOutlined />}
      >
        Xóa khỏi hồ sơ
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      width: "5%",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "40%",
      render: (_: any, record: any) => {
        const artist = users.find(
          (user: TypeUser) => user.userId === record.artist
        );

        return (
          <div className="flex">
            <img
              src={record.image}
              alt={record.title}
              style={{ width: "65px", height: "50px" }}
            />

            <div className="pl-5">
              <div>{record.title}</div>
              <div style={{ fontSize: "14px", color: "gray" }}>
                <Link
                  to={`/detail-artists/${artist?.userId}`}
                  className="hover:text-green-500"
                >
                  {artist ? artist.name : ""}
                </Link>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      key: "genre",
      render: (_: any, record: any) => {
        const genreItem = songGenre.find(
          (genre: TypeGenre) => genre.genreId == record.genre
        ) as TypeGenre | undefined;
        return genreItem ? genreItem.nameGenre : "Unknown";
      },
      width: "20%",
    },
    {
      title: "Ngày thêm",
      dataIndex: "addedDate",
      key: "addedDate",
      render: (_: any, record: any) => {
        const formattedDate = moment(record.date).format("DD/MM/YYYY");
        return <span>{formattedDate}</span>;
      },
      width: "15%",
    },
    {
      title: <ClockCircleOutlined />,
      dataIndex: "duration",
      key: "duration",
      width: "10%",
    },
    {
      dataIndex: "action",
      key: "action",
      width: "10%",
    },
  ];

  const existingSongIds = playListDetailById?.PlaylistSongs?.map(
    (playlistSong) => playlistSong.songId
  );
  const filteredSongs = songLists.filter(
    (song: TypeSong) => !existingSongIds?.includes(song.songId)
  );

  const data = filteredSongs.map((song: TypeSong, index) => ({
    key: index + 1,
    number: (index + 1).toString(),
    title: song.songName,
    genre: song.genreId,
    addedDate: song.publicDate,
    duration: song.duration,
    action: (
      <Button
        className="custom-button"
        onClick={() => {
          handleAddSongToPlayist(song.songId, playListDetailById.id);
        }}
      >
        Thêm
      </Button>
    ),
    description: song.description,
    image: song.songImage,
    artist: song.userId,
  }));

  const playlistData =
    playListDetailById.PlaylistSongs?.map(
      (playlistSong: PlaylistSong, index: number) => {
        const isPlaying = playlistSong.Song.songId === currentPlayingSongId;
        const rowClassName = isPlaying
          ? "custom-row playing"
          : "custom-row not-playing";
        return {
          key: index + 1,
          id: playlistSong.Song.songId,
          number: isPlaying ? (
            <PlayCircleOutlined className="text-green-500 text-lg" />
          ) : (
            index + 1
          ),
          title: playlistSong.Song.songName,
          genre: playlistSong.Song.genreId,
          addedDate: playlistSong.Song.publicDate,
          duration: playlistSong.Song.duration,
          image: playlistSong.Song.songImage,
          artist: playlistSong.Song.userId,
          onclick: () => handlePlayMusic(playlistSong.Song.songId),
          action: (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">
                    <Button
                      type="link"
                      icon={<UserOutlined />}
                      className="text-gray-500"
                    >
                      <Link to={`/detail-artists/${playlistSong.Song.userId}`}>
                        Chuyển tới nghệ sĩ
                      </Link>
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      className="text-gray-500"
                      onClick={() => {
                        handleDeleteFromPlaylist(playlistSong.Song.songId);
                      }}
                    >
                      Xóa khỏi playlist
                    </Button>
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button type="link" className="text-white">
                ...
              </Button>
            </Dropdown>
          ),
          className: rowClassName,
        };
      }
    ) || [];

  // filter search
  const filteredData = data.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery) ||
      users
        .find((user) => user.userId === song.artist)
        ?.name.toLowerCase()
        .includes(searchQuery)
  );

  // tính tổng thời gian của các bài hát trong playlist
  const parseDurationToSeconds = (duration: string) => {
    const parts = duration.split(":");
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parseInt(parts[1], 10) || 0;
    return minutes * 60 + seconds;
  };

  const formatDuration = (totalSeconds: any) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return ` ${minutes} phút ${seconds < 10 ? "0" : ""}${seconds} giây`;
  };

  const totalDuration =
    playListDetailById.PlaylistSongs?.reduce((sum, playlist) => {
      return sum + parseDurationToSeconds(playlist.Song.duration);
    }, 0) || 0;

  const formattedDuration = formatDuration(totalDuration);

  return (
    <div
      style={{
        backgroundColor: "#0f1a1a",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        width: "100%",
      }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Avatar
            shape="square"
            size={200}
            src={playListDetailById.imagePath}
            alt="Playlist cover"
          />
        </Col>
        <Col span={18}>
          <Space direction="vertical">
            <Text type="secondary">Playlist</Text>
            <Title style={{ color: "white", margin: 0 }}>
              {playListDetailById.playlistName}
            </Title>
            <Text style={{ color: "white", fontSize: "16px" }}>
              {user?.name} • {playListDetailById.PlaylistSongs?.length} bài hát,
              {formattedDuration}
            </Text>
          </Space>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }} align="middle">
        <Col>
          <Button
            type="primary"
            shape="circle"
            icon={<PlayCircleOutlined />}
            size="large"
            onClick={handlePlayPlaylist}
            style={{ backgroundColor: "#1db954", borderColor: "#1db954" }}
          />
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="text"
              shape="circle"
              icon={<EllipsisOutlined />}
              size="large"
              style={{ marginLeft: "10px", color: "white" }}
            />
          </Dropdown>
        </Col>
      </Row>

      {playListDetailById.PlaylistSongs &&
        playListDetailById.PlaylistSongs.length > 0 && (
          <Table
            pagination={false}
            columns={columns}
            dataSource={playlistData}
            style={{
              marginTop: "20px",
            }}
            onRow={(record) => ({
              onClick: () => {
                handlePlayMusic(record.id);
              },
            })}
            className="custom-transparent-table"
            rowClassName={(record) => record.className}
          />
        )}

      <div>
        {isVisible && (
          <div className="flex">
            <h1 className="text-2xl font-medium mt-10" style={{ width: "90%" }}>
              Hãy cùng tìm nội dung cho danh sách phát của bạn
            </h1>
            <Button
              onClick={handleClose}
              className="text-3xl font-medium mt-10"
              style={{
                width: "10%",
                backgroundColor: "transparent",
                border: "none",
              }}
              icon={
                <CloseOutlined className="text-white font-medium text-xl" />
              }
            />
          </div>
        )}

        {!isVisible && (
          <div className="flex">
            <div style={{ width: "90%" }}>
              <h1 className="text-2xl font-medium mt-10">Đề xuất</h1>
              <p className="text-sm text-gray-400 mt-3">
                Dựa trên nội dung có trong danh sách phát này
              </p>
            </div>
            <h5
              className="mt-10 hover:cursor-pointer hover:font-medium"
              style={{ width: "10%" }}
              onClick={() => setIsVisible(true)}
            >
              Tìm thêm
            </h5>
          </div>
        )}

        {isVisible && (
          <Input
            placeholder="Tìm bài hát và tập podcast"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{
              marginTop: "20px",
              backgroundColor: "#121212",
              color: "white",
              width: "40%",
            }}
            value={searchQuery}
            allowClear
            className="custom-input"
          />
        )}

        {(searchQuery || !isVisible) && (
          <Table
            className="custom-transparent-table"
            columns={columns} // Đảm bảo bạn đã định nghĩa `columns`
            showHeader={false}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
            }}
            style={{
              marginTop: "20px",
              backgroundColor: "#121212",
              color: "white",
            }}
            rowClassName={() => "custom-row"}
          />
        )}
      </div>

      <Modal
        className="custom-modal"
        title=<h1
          className="text-xl text-white"
          style={{ backgroundColor: " rgb(49, 49, 49)" }}
        >
          Sửa thông tin chi tiết
        </h1>
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        width={500}
        footer={[
          <Button key="submit" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
          <p style={{ marginTop: "16px", fontSize: "13px", textAlign: "left" }}>
            Bằng cách tiếp tục, bạn đồng ý cho phép Spotify truy cập vào hình
            ảnh bạn đã chọn để tải lên. Vui lòng đảm bảo bạn có quyền tài lên
            hình ảnh.
          </p>,
        ]}
      >
        <Form form={form}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "20px 0",
              height: "230px",
            }}
          >
            <img
              src={playListDetailById.imagePath}
              alt="ảnh"
              style={{
                width: "35%",
                height: "100%",
                objectFit: "cover",
                marginRight: "16px",
                borderRadius: "4px",
              }}
            />
            <div style={{ flex: 1 }}>
              <Form.Item name="playlistName">
                <Input
                  className="custom-input"
                  style={{
                    backgroundColor: "#4a4a4a",
                    border: "none",
                    color: "white",
                  }}
                  placeholder="Danh sách phát của tôi #2"
                />
              </Form.Item>
              <Form.Item name="description">
                <Input.TextArea
                  className="custom-input"
                  rows={5}
                  placeholder="Thêm phần mô tả không bắt buộc"
                  style={{
                    marginTop: "16px",
                    backgroundColor: "#4a4a4a",
                    border: "none",
                    color: "white",
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>

    </div>
  );
};

export default PlaylistComponent;
