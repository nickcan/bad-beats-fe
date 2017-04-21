const initialState = {
  posts: []
};

const feed = function(state = initialState, action) {
  switch(action.type) {
    case "INITIALIZE_POSTS": {
      return {
        ...state,
        posts: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export default feed;

