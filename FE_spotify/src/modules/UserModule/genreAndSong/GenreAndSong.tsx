import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAndSetSongGenre } from "../../../apis/apiGetSongGenre";
import { fetchAndSetAllSongs } from "../../../apis/apiGetAllSongs";
import { Table } from "antd";
import { TypeSong } from "../../../types/typeSong";
import { apiGetUser } from "../../../apis/apiGetUser";
import { TypeUser } from "../../../types/typeUser";
import moment from "moment";
import "./../playList/Playlist.css"

import {
  ClockCircleOutlined,
} from "@ant-design/icons";
import { TypeGenre } from "../../../types/typeGenre";
import { useGlobalContext } from "../../../globalContext/GlobalContext";

export default function GenreAndSong() {
  const dispatch = useDispatch<AppDispatch>();
  const { songLists, songGenre } = useAppSelector((state) => state.song);
  const {id} = useParams()
  const [users, setUsers] = useState<TypeUser[]>([]);
  const { setIdMusic } =  useGlobalContext();

  const callApiGetUser = async () => {
    const result = await apiGetUser();
    setUsers(Array.isArray(result) ? result : [result]);
  };


  useEffect(() => {
    dispatch(fetchAndSetSongGenre());
    dispatch(fetchAndSetAllSongs());
    callApiGetUser()
  }, [dispatch]);

const handlePlayMusic = (id :any) => {
  setIdMusic(id)
}
  // Filter songs based on the genreId from URL params
  const filteredSongs = songLists.filter((song : TypeSong) => song.genreId === Number(id));
  
  const genreFind = songGenre.find(
    (genre: TypeGenre) => Number(id) === genre.genreId
  ) as TypeGenre | undefined;
  

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      width: "5%",
      render: (_: any, record :any, index: any) => <span>{index + 1}</span>
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "40%",
      render: (_: any, record: any) => {
        const artist = users.find(
          (user: TypeUser) => user.userId === record.userId
        );

        return (
          <div className="flex">
            <img
              src={record.songImage}
              alt={record.songName}
              style={{ width: "65px", height: "50px" }}
            />

            <div className="pl-5">
              <div>{record.songName}</div>
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

  console.log(genreFind);
  

  return (
    <div>
      <h1 className="font-medium text-lg ml-5 mt-5 bg-green-600 text-black inline px-5 py-2 rounded">{genreFind ? genreFind.nameGenre : ""} song</h1>
      <Table 
        columns={columns} 
        dataSource={filteredSongs} 
        rowKey="id" 
        className="custom-transparent-table mt-5 px-5"
        pagination={{ pageSize: 10 }} // Optional: Controls pagination
        onRow={(record) => ({
          onClick: () => {
            handlePlayMusic(record.songId);
          },
        })}
      />
    </div>
  );
}
