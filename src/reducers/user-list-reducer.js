const initialState = {
  hasNoMoreUsers: false,
  users: {}
};

const createUsersObject = function(usersArray = [], usersObjects = {}, currentIndex = 0) {
  if (currentIndex >= usersArray.length) {
    return usersObjects;
  } else {
    const nextUser = usersArray[currentIndex];
    const appendedObject = {
      ...usersObjects,
      [nextUser.id]: nextUser
    };

    return createUsersObject(usersArray, appendedObject, currentIndex + 1);
  }
};

const userList = function(state = initialState, action) {
  switch(action.type) {
    case "APPEND_USER_LIST": {
      return {
        ...state,
        hasNoMoreUsers: action.payload.length === 0,
        users: {
          ...state.users,
          ...createUsersObject(action.payload)
        }
      }
    }

    case "INITIALIZE_USER_LIST": {
      return {
        ...initialState,
        users: createUsersObject(action.payload)
      }
    }

    case "UPDATE_USER_IN_LIST": {
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: {
            ...state.users[action.payload.id],
            ...action.payload
          }
        }
      }
    }

    case "RESET_USER_LIST": {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export default userList;
