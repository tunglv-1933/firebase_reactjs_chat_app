import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import '../css/InputChat.css';
import { useStateValue } from '../StateProvider';
import db from '../firebase';

function InputChat({ refMessageEnd }) {
  const [{ user, currentRoom }, dispatch] = useStateValue();
  const [message, setMessage] = useState("");
  const refInputChat = useRef(null);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(message) {
      db.collection('messages').add({
        user_id: user.uid,
        content: message,
        username: user.displayName,
        avatar_url: user.photoURL,
        time_stamp: Date.now(),
        room_id: currentRoom.id
      }).then(function() {
        e.target.reset();
        refMessageEnd.current.scrollIntoView();
      });
    } else {
      alert("message must be not empty");
    }
  }

  return(
    <div className="input-chat">
      <form onSubmit={handleSubmit}>
      <TextField
        label="Message"
        placeholder="Type a message to your friend"
        autoFocus
        fullWidth
        variant="outlined"
        className="ipt-elm"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeMessage}
        ref={refInputChat}
      />
      </form>
    </div>
  )
}

export default InputChat;
