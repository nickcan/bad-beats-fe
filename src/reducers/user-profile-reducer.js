const initialState = {
  id: "",
  email: "",
  image_url: "",
  name: "",
  followerCount: null,
  followingCount: null,
  isActiveUserFollowing: false
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

    case "RESET_USER_PROFILE": {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export default userProfile;
