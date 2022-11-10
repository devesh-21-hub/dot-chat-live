import React, { useState } from "react";
import Picker from "emoji-picker-react";

//import Icon from "@material-ui/core/Icon";
import { AiOutlineSmile } from "react-icons/ai";

const Emojipicker = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject);
    if (text !== "") {
      setText(text + emojiObject.emoji);
    } else {
      setText(emojiObject.emoji);
    }

    setShow(false);
  };
  const handleChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };
  return (
    <div>
      play with emotes
      <input value={text} onChange={handleChange} />
      {show ? <Picker onEmojiClick={onEmojiClick} /> : <div />}
      <button onClick={() => setShow(true)}>Add emoji</button>
      <br />
      {text}
      <br />
      <AiOutlineSmile />
    </div>
  );
};

export default Emojipicker;
