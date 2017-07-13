const initialState = {
  image: {},
  sport: "",
  tags: [],
  text: "",
  isPostsFormOpen: false
};

const postForm = function(state = initialState, action) {
  switch(action.type) {
    case "TOGGLE_POST_FORM_VIEW": {
      // If true, then reset the form
      if (state.isPostsFormOpen) {
        return initialState;
      } else {
        return {
          ...state,
          isPostsFormOpen: !state.isPostsFormOpen
        }
      }
    }

    case "UPDATE_POST_FORM_IMAGE": {
      return {
        ...state,
        image: action.payload
      }
    }

    case "UPDATE_POST_FORM": {
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    }

    default: {
      return state;
    }
  }
}

export default postForm;
