import React from 'react';
import ListRooms from './ListRooms';
import ListMessages from './ListMessages';
import RoomDescription from './RoomDescription';
import '../css/Chat.css';

function Chat() {
  return(
    <div className="body__chat-container">
      <ListRooms />
      <ListMessages />
      <RoomDescription />
    </div>
  )
}

export default Chat;
