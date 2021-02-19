import React, { useRef } from 'react';
import Message from './Message';
import InputChat from './InputChat';
import '../css/ListMessages.css';
import { useStateValue } from '../StateProvider';

function ListMessages() {
  const [{ currentRoomName, messages }, dispatch] = useStateValue();
  const refMessageEnd = useRef(null);

  return(
    <div className="chat-container__list-messages">
      <div className="list-messages__header">
        <div className="conversation-name">{currentRoomName}</div>
      </div>
      <div className="list-messages">
        {
          messages.length > 0 && messages.map(message => (
            <Message
              key={message.id}
              message={message}
            />
          ))
        }
        <div ref={refMessageEnd}></div>
      </div>
      <div className="ipt-area">
        <InputChat refMessageEnd={refMessageEnd}/>
      </div>
    </div>
  )
}

export default ListMessages;
