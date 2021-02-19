import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../css/Contact.css';
import db from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';

function Contact({ user }) {
  const [state , dispatch] = useStateValue();

  const handleJoinRoom = () => {
    db.collection('rooms')
    .where('members', 'in', [[state.user.uid, user.user_id], [user.user_id, state.user.uid]])
    .get().then(r => {
      if (r.empty) {
        db.collection('rooms').add({
          members: [state.user.uid, user.user_id]
        }).then(function(room) {
          dispatch({
            type: actionTypes.SET_CURRENT_ROOM,
            payload: {id: room.docs[0].id, ...room.docs[0].data()}
          });

          dispatch({
            type: actionTypes.SET_CURRENT_ROOM_NAME,
            payload: user.username
          });

          db.collection('messages')
          .where('room_id', '==', room.docs[0].id)
          .orderBy('time_stamp')
          .onSnapshot(snapshot =>
            dispatch({
              type: actionTypes.SET_MESSAGES,
              payload: [
                ...snapshot.docs.map(doc => ( { id: doc.id, ...doc.data() } ))
              ]
            })
          );
        });
      } else {
        dispatch({
          type: actionTypes.SET_CURRENT_ROOM,
          payload: {id: r.docs[0].id, ...r.docs[0].data()}
        });

        dispatch({
          type: actionTypes.SET_CURRENT_ROOM_NAME,
          payload: user.username
        });

        db.collection('messages')
        .where('room_id', '==', r.docs[0].id)
        .orderBy('time_stamp')
        .onSnapshot(snapshot =>
          dispatch({
            type: actionTypes.SET_MESSAGES,
            payload: [
              ...snapshot.docs.map(doc => ( { id: doc.id, ...doc.data() } ))
            ]
          })
        );
      }
    });
  }

  let classListContact = 'list-contact__contact'
  if (state.currentRoom) {
    if(state.currentRoom.members.includes(user.uid) && state.currentRoom.members.includes(state.user.uid)) {
      classListContact = 'list-contact__contact active';
    }
  }

  return(
    <div className={classListContact} onClick={handleJoinRoom}>
      {user.user_id !== user.uid && <Avatar alt={user.username} src={user.avatar_url} title={user.username} />}
      <div className="contact-content">
        <div className="name">{user.username}</div>
      </div>
    </div>
  )
}

export default Contact;
