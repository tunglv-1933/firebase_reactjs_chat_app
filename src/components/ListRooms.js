import React, { useEffect } from 'react';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Contact from './Contact';
import '../css/ListRoom.css';
import db from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';

function ListRooms() {
  const [{ listUsers }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection('users').onSnapshot(snapshot =>
      dispatch({
        type: actionTypes.SET_LIST_USERS,
        payload: snapshot.docs.map(doc => ( { id: doc.id, ...doc.data() } ))
      })
    );
  }, []);

  return(
    <div className="chat-container__list-room">
      <div className="list-room__header">
        <SettingsOutlinedIcon />
        <div>Messenger</div>
        <EditOutlinedIcon />
      </div>
      <div className="list-room__search">
        <SearchIcon className="search-icon" />
        <InputBase className="inputTypeSearch" placeholder="search..." />
      </div>
      <div className="list-room__list-contact">
        {
          listUsers.length > 0 && listUsers.map( user => <Contact key={user.id} user={user} />)
        }
      </div>
    </div>
  )
}

export default ListRooms;
