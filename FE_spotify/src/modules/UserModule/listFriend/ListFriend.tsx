import React, { useEffect, useRef, useState } from "react";
import { Button, Menu, Avatar, List, Drawer } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { apiGetFriend } from "../../../apis/apiGetFriend";
import { TypeListFriend } from "../../../types/typeListFriend";
import "./listFriend.css";
import { io, Socket } from "socket.io-client";
import { apiGetMessage } from "../../../apis/apiGetMessage";
import { TypeMessage } from "../../../types/typeMessage";
import { TypeUser } from "../../../types/typeUser";
import moment from "moment";

interface ContentMessage {
  message: TypeMessage[]; // Định nghĩa là một mảng các TypeMessage
  sender?: TypeUser;
}
const ListFriend: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const [open, setOpen] = useState(false);
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [showListFriend, isShowListFriend] = useState<
    TypeListFriend[] | undefined
  >([]);
  const [chatWith, setChatWith] = useState<TypeListFriend>();
  const [contentMessages, setContentMessages] = useState<
    ContentMessage | undefined
  >(undefined);
  const [roomChat, setRoomChat] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const { friendLists } = useAppSelector((state) => state.friend);

  socketRef.current = io("http://localhost:8080", {
    transports: ["websocket"],
    reconnection: true, // Cho phép tự động kết nối lại
    reconnectionAttempts: Infinity, // Số lần thử kết nối lại
    reconnectionDelay: 1000, // Thời gian chờ giữa các lần thử kết nối lại
    secure: false, // Đặt thành false nếu bạn không sử dụng HTTPS
    timeout: 20000, // Thời gian chờ kết nối (tăng thời gian nếu cần)
    autoConnect: true, // Tự động kết nối khi khởi tạo
  });
  // show drawer
  const showDrawer = (data?: any) => {
    setOpen(!open);
    if (data) {
      setChatWith(data);
      setOpenMessageBox(true);
      createRoomChat(currentUser.user.userId, data.friendId);
    }
  };

  // close drawer
  const onClose = () => {
    setOpen(false);
  };

  // call api get message
  const callApiGetMessage = async () => {
    if (roomChat) {
      const result = await apiGetMessage(roomChat);
      setContentMessages(result);
    }
  };

  // func api get ListFriend
  const callApiGetListFriend = async (id: any) => {
    const result = await apiGetFriend(id);
    if (result) {
      isShowListFriend(result);
    }
  };

  // call function api getListFriend
  useEffect(() => {
    if (currentUser) {
      callApiGetListFriend(currentUser.user.userId);
    }
  }, [currentUser, friendLists]);

  // call api getMessage
  useEffect(() => {
    callApiGetMessage();
  }, [roomChat]);

  // handler render listFriend
  const renderListFriend = () => {
    if (showListFriend) {
      return (
        <List
          dataSource={showListFriend}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.User_ListFriends_friendIdToUser.avatar} />
                }
                title={
                  <button
                    onClick={() => {
                      showDrawer(item);
                    }}
                    className="font-medium"
                  >
                    {item.User_ListFriends_friendIdToUser.name}
                  </button>
                }
              />
            </List.Item>
          )}
        />
      );
    }
  };

  const createRoomChat = (user1: string, user2: string) => {
    setRoomChat([user1, user2].sort().join("-"));
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("connect", () => {
        console.log("Socket connected successfully!");
        setTimeout(() => {
          console.log("Socket ID:", socketRef.current?.id); // Kiểm tra lại ID sau khi kết nối thành công
        }, 100); // Đặt độ trễ 100ms trước khi kiểm tra ID
      });
      socketRef.current.on("message", (newMessage) => {
        setContentMessages((prevMessages) => {
          if (prevMessages) {
            return {
              ...prevMessages,
              message: [...prevMessages.message, newMessage],
            };
          } else {
            return {
              message: [newMessage],
              sender: currentUser.user.userId,
            };
          }
        });
      });
      // Xử lý khi socket bị ngắt kết nối
      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, []);

  const handleSendMessage = (content: string) => {
    if (socketRef.current) {
      if (!socketRef.current.connected) {
        socketRef.current.connect();
        return;
      }
      const date = new Date();
      if (!socketRef.current.connected) {
        console.log("connect false");
        return;
      }
      if (chatWith) {
        const newMessage: TypeMessage = {
          idSender: currentUser.user.userId,
          timeSend: date,
          contentMess: content,
          roomChat: roomChat,
        };

        socketRef.current.emit("message", newMessage, (response: any) => {
          console.log("message send success", response);
        }); // Gửi tin nhắn qua socket
      }
    }
  };
  // handler scroll when open message box
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom(); // Cuộn đến cuối khi messages thay đổi
    }, 480);
  }, [contentMessages, openMessageBox]);

  const handleShowMessage = () => {
    if (contentMessages) {
      return contentMessages.message.map((message: TypeMessage, index) => {
        const date = moment(message.timeSend).format("DD/MM/YYYY HH:mm:ss");
        return (
          <>
            <div
              key={index}
              className={`message-item my-2 p-2 max-w-xs rounded-lg w-3/6 ${
                message.idSender === currentUser.user.userId
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-white text-black"
              }`}
            >
              {message.contentMess}
              <p className="contentMessage text-xs mt-2">{date}</p>
            </div>
            <div ref={chatEndRef} />
          </>
        );
      });
    }
  };

  return (
    <>
      <div>
        <Button
          className="btn-show-listFriend mb-1"
          type="primary"
          onClick={() => {
            showDrawer(null);
          }}
        >
          <i className="fa-solid fa-user-group"></i>
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
        />
        <Drawer title="List Friend" onClose={onClose} open={open} width={250}>
          {renderListFriend()}
        </Drawer>

        {chatWith && openMessageBox && (
          <div
            className="message-box bg-slate-900 h-96 flex flex-col justify-between"
            style={{
              width: "320px",
            }}
          >
            <div className="flex items-center">
              <button
                onClick={() => {
                  setOpenMessageBox(false);
                }}
              >
                <i className="fa-solid fa-x mr-3 text-white"></i>
              </button>
              <img
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={chatWith.User_ListFriends_friendIdToUser?.avatar}
              ></img>
              <h2 className="text-white">
                Chat with {chatWith.User_ListFriends_friendIdToUser?.name}
              </h2>
            </div>
            <div className="message-list">{handleShowMessage()}</div>
            <MessageInput onSend={handleSendMessage} />
          </div>
        )}
      </div>
    </>
  );
};
interface MessageInputProps {
  onSend: (content: string) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue(""); // Reset input sau khi gửi
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(); // Gửi tin nhắn khi nhấn Enter
    }
  };

  return (
    <div className="message-input">
      <input
        className="text-black"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        onKeyPress={handleKeyPress}
      />
      <button className="text-white" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};
export default ListFriend;
