const initialState = {
  "email": "",
  "id": "",
  "image_url": "",
  "name": ""
};

const activeUser = function(state = initialState, action) {
  switch(action.type) {
    case "INITIALIZE_ACTIVE_USER_DATA": {
      return {
        ...state,
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export default activeUser;
