import classes from "./Message.module.css";
import moment from "moment";

export default function Message(props) {
  const { data } = props;
  return (
    <div
      className={
        data.own ? `${classes.message} ${classes.own}` : `${classes.message}`
      }
    >
      <div className={classes.messageTop}>
        <img
          className={classes.messageImg}
          src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <p className={classes.messageText}>{data.message.text}</p>
      </div>
      <div className={classes.messageBottom}>
        {moment(data.message.createdAt).format("h:mm A")}
      </div>
    </div>
  );
}

//{moment(data.message.createdAt).format("h:mm A")}
