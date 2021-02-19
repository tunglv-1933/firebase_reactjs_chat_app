export const initialState = {
  user: null,
  currentRoom: null,
  currentRoomName: 'Chat All',
  listUsers: [],
  messages: []
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_LIST_USERS: "SET_LIST_USERS",
  SET_CURRENT_ROOM: "SET_CURRENT_ROOM",
  SET_CURRENT_ROOM_NAME: "SET_CURRENT_ROOM_NAME",
  SET_MESSAGES: "SET_MESSAGES"

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.SET_LIST_USERS:
      return {
        ...state,
        listUsers: action.payload
      }

    case actionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload
      }

    case actionTypes.SET_CURRENT_ROOM_NAME:
      return {
        ...state,
        currentRoomName: action.payload
      }

    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }

    default:
      return state;
  }
};

export default reducer;
