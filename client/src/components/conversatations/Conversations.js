import classes from "./Conversations.module.css";
const imageLink =
  "https://images.pexels.com/photos/4668527/pexels-photo-4668527.jpeg?auto=compress&cs=tinysrgb&w=600";
const Conversations = ({
  username,
  online,
  id,
  onShow,
  profilePic,
  lastMessage,
}) => {
  if (lastMessage === "")
    lastMessage = `Start a new conversation with ${username}`;

  const handleConversationClick = () => {
    onShow(id);
  };

  return (
    <div
      title={username}
      onClick={handleConversationClick}
      className={classes.conversation}
    >
      <img className={classes.conversationImg} src={imageLink} alt="User" />
      {online && <div className={classes.onlineBadge}></div>}
      <span className={classes.conversationName}>{username}</span>
      <span className={classes.lastMessage}>{lastMessage}</span>
    </div>
  );
};

export default Conversations;

//
