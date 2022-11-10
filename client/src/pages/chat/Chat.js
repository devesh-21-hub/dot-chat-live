import classes from "./Chat.module.css";
import NavBar from "../../components/navbar/Navbar";
import Conversations from "../../components/conversatations/Conversations";
import Message from "../../components/message/Message";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:9000");

const Chat = () => {
  const [typing, setIstyping] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState(null);

  let MESSAGES = [];

  const [currentMessages, setCurrentMessages] = useState([
    {
      _id: "",
    },
  ]);

  useEffect(() => {
    socket.on("userIsTyping", (data) => {
      console.log("Data", data);
      setIstyping("Typing...");
    });

    socket.on("userIsNotTyping", (data) => {
      console.log("Data", data);
      setIstyping("");
    });
  }, []);

  const handleInputFocus = () => {
    socket.emit("typing");
  };

  const handleInputBlur = () => {
    socket.emit("nottyping");
  };

  const name = useSelector((state) => state.user.name);
  const currentusername = useSelector((state) => state.user.username);
  const conversations = useSelector((state) => state.user.conversations);

  console.log("All Conversation: ", conversations);

  const showConversations = (id) => {
    const messagesToShow = conversations.find((conversation) => {
      return conversation._id === id;
    });
    setCurrentMessages(messagesToShow.messages);
    setCurrentConversationId(messagesToShow._id);
  };

  useEffect(() => {
    if (conversations.length > 0) {
      setCurrentMessages(conversations[0].messages);
      setCurrentConversationId(conversations[0]._id);
    }
  }, [conversations.length, conversations]);

  const loadingContent = (
    <div className={classes.centered}>
      <LoadingSpinner />
    </div>
  );

  if (conversations.length > 0) {
    MESSAGES = [];
    currentMessages.forEach((_message) => {
      const own = _message.sender === currentusername ? true : false;
      const text = _message.text;
      const createdAt = _message.createdAt;
      const id = _message._id;

      const message = {
        own,
        message: {
          text,
          createdAt,
        },
        id,
      };

      MESSAGES.push(message);
    });
  }

  console.log(currentConversationId);

  //console.log("MESSAGES: ", MESSAGES);

  //Apply the below logic for profile pic

  /*


  profilePic={
                    name === conversation.user1.name
                      ? conversation.user2.pic
                      : conversation.user1.pic
                  }
  
  
  */

  return (
    <>
      <NavBar />
      <div className={classes.chatContainer}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            <input
              placeholder="Search chats..."
              className={classes.chatMenuInput}
            />

            {conversations.length < 1
              ? loadingContent
              : conversations.map((conversation) => {
                  const lastMessageIndex = conversation.messages.length - 1;
                  const lastMessage =
                    conversation.messages[lastMessageIndex].text;

                  const lastMessageToShow =
                    lastMessage.length > 55
                      ? lastMessage.slice(0, 55)
                      : lastMessage;

                  console.log(lastMessage);
                  return (
                    <Conversations
                      className={`${
                        currentConversationId === conversation._id &&
                        classes.now
                      }`}
                      lastMessage={`${lastMessageToShow}...`}
                      onShow={showConversations}
                      key={conversation._id}
                      id={conversation._id}
                      online={true}
                      username={
                        name === conversation.user1.name
                          ? conversation.user2.name
                          : conversation.user1.name
                      }
                    />
                  );
                })}
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            <span>{typing}</span>
            <div className={classes.chatBoxTop}>
              {conversations.length < 1
                ? loadingContent
                : MESSAGES.map((message) => {
                    return <Message data={message} key={message.id} />;
                  })}
            </div>
            <div className={classes.chatBoxBottom}>
              <textarea
                spellCheck={false}
                autoComplete="off"
                className={classes.chatInputArea}
                placeholder="Enter your message..."
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              ></textarea>
              <button className={classes.chatSendButton}>
                {" "}
                <SendOutlinedIcon className={classes.sendIcon} />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
