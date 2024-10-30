import { useParams } from "react-router-dom";
import { apiDetailArtists } from "../../../apis/apiGetDetailArtists";
import { useEffect, useState } from "react";
import { TypeUser } from "../../../types/typeUser";
import "./detailArtists.css";
import { apiGetSongById } from "../../../apis/apiGetSongById";
import { TypeSong } from "../../../types/typeSong";
import { useGlobalContext } from "../../../globalContext/GlobalContext";
import { apiGetFollow } from "../../../apis/apiGetFollow";
import { useAppSelector } from "../../../redux/hooks";
import { apiSendFollow } from "../../../apis/apiSendFollow";
import { apiUnfollow } from "../../../apis/apiUnfollow";
import { Button } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { addFriend } from "../../../apis/apiListFriend/apiAddFriend";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { apiGetFriend } from "../../../apis/apiGetFriend";
import { deleteFriend } from "../../../apis/apiListFriend/apiDeleteFriend";

export default function DetailArtists() {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  // const { userId } = currentUser?.user
  const { id } = useParams();
  const [dataUser, setDataUser] = useState<TypeUser>();
  const [dataSong, setDataSong] = useState<TypeSong[]>([]);
  const { setIdMusic } = useGlobalContext();
  const { setNameArtists } = useGlobalContext();
  const [follow, isFollow] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // Api getUser
  const callApiDetailUser = async () => {
    const result = await apiDetailArtists(id);
    setNameArtists(result.name);
    setDataUser(result);
  };

  const apiCheckFollow = async () => {
    if (currentUser) {
      const result = await apiGetFollow(currentUser.user.userId, id);
      isFollow(result.isFollowing);
    }
  };

  // Api getSong
  const callApiGetSong = async () => {
    const result = await apiGetSongById(id);
    setDataSong(Array.isArray(result) ? result : [result]);
  };

  const handlerTotalViewer = () => {
    let totalViewer = 0;
    if (dataSong) {
      for (let i = 0; i < dataSong.length; i++) {
        totalViewer += dataSong[i].viewer;
      }
    }
    return totalViewer.toLocaleString("en-US");
  };

  const handlerGetIdMusic = (id: any) => {
    setIdMusic(id);
  };

  const renderTableSong = () => {
    if (dataSong) {
      return dataSong.map((itemSong, index) => {
        return (
          <>
            <button
              className="mb-3"
              onClick={() => {
                handlerGetIdMusic(itemSong.songId);
              }}
            >
              <tr key={itemSong.songId}>
                <td>{index + 1}</td>
                <td>
                  <img
                    style={{
                      width: "70px",
                      height: "50px",
                    }}
                    src={itemSong.songImage}
                  />
                </td>
                <td>{itemSong.songName}</td>
                <td>{itemSong.viewer}</td>
                <td>{itemSong.duration}</td>
              </tr>
            </button>
          </>
        );
      });
    }
  };

  const callApiSendFollow = async (id: number) => {
    const { userId } = currentUser.user;
    const result = await apiSendFollow({ userId, followingId: id });
    if (result) {
      isFollow(true);
    }
  };

  const callApiUnFollow = async (id: number) => {
    const { userId } = currentUser.user;
    const result = await apiUnfollow({ userId, followingId: id });
    if (result) {
      isFollow(false);
    }
  };

  const handleAddFriend = async() => {
    if (currentUser.user.userId === id) {
      return;
    }
    const payload = {
      userId: currentUser.user.userId,
      friendId: Number(id),
      roomChat: `${currentUser.user.userId}-${id}`,
    };
    await dispatch(addFriend(payload));
    callApiGetFriend()
  };

  const handleRemoveFriend = (id : string | undefined) => {
    if(id){
      dispatch(deleteFriend(id))
      callApiGetFriend()
    }
  }

  const callApiGetFriend = async () => {
    const result = await apiGetFriend(currentUser.user.userId);
    if (result) {
      const checkFriend = result.some(
        (friend) => friend.friendId === Number(id)
      );
      setIsFriend(checkFriend);
    }
  };


  useEffect(() => {
    callApiDetailUser();
    callApiGetSong();
    apiCheckFollow();
    callApiGetFriend();
  }, [id]);

  return (
    <section className="detail-artists h-100">
      <div className="banner-artists">
        <img className="img-banner" src={dataUser?.banner}></img>
        <div className="info-artists">
          <p className="name-artists">{dataUser?.name}</p>
          <p className="viewer">{handlerTotalViewer()} Viewer</p>
        </div>
      </div>

      <div className="song-artists">
        <div className="button">
          <button className="btn-play">
            <i className="fa-solid fa-circle-play"></i>
          </button>
          <button className="btn-follow mt-4">
            {follow ? (
              <button
                onClick={() => {
                  callApiUnFollow(Number(id));
                }}
              >
                <i className="fa-solid fa-circle-check mr-1"></i>Follow
              </button>
            ) : (
              <button
                onClick={() => {
                  callApiSendFollow(Number(id));
                }}
              >
                Follow
              </button>
            )}
          </button>
          {isFriend ? (
            <Button
              type="link"
              icon={<UserOutlined />} // biểu tượng cho "isFriend"
              className="text-white bg-green-600 mt-3 ml-5 hover:bg-green-700 hover:font-semibold hover:text-white"
              onClick={() => handleRemoveFriend(id)} // Hủy kết bạn
            >
              Hủy kết bạn
            </Button>
          ) : (
            <Button
              type="link"
              icon={<UserAddOutlined />} // biểu tượng cho "Thêm bạn bè"
              className="text-white bg-green-600 mt-3 ml-5"
              onClick={handleAddFriend} // Thêm bạn bè
            >
              Thêm bạn bè
            </Button>
          )}
        </div>
        <div className="list-song">
          <h1 className="tittle-list-song mb-3 text-white">Popular</h1>
          <div>
            <table className="table-auto border-separate border-spacing-x-20">
              <tbody className="text-white">{renderTableSong()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
