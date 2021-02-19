import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../css/Message.css';
import { useStateValue } from '../StateProvider';

function Message({ message }) {
  const [{ user }, dispatch] = useStateValue();

  return(
    message && (
      <div className={message.user_id === user.uid ? "message active" : "message"}>
        {message.user_id !== user.uid && <Avatar alt={message.username} src={message.avatar_url} title={message.username} />}
        <div className="message-content" title={new Date(message.time_stamp).toLocaleDateString()}>
          <div className="message-content__text">{message.content}</div>
        </div>
      </div>
    )
  )
}

export default Message;
