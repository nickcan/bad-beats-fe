const initialState = {
  id: "",
  email: "",
  image_url: "",
  name: "",
  follower_count: null,
  following_count: null,
  activeUserIsFollowing: false
}

const userProfile = function(state = initialState, action) {
  switch(action.type) {
    case "INITIALIZE_USER_PROFILE": {
      return {
        ...state,
        ...action.payload
      }
    }

    case "UPDATE_USER_PROFILE": {
      return {
        ...state,
        ...action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default userProfile;
