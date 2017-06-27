const initialState = {
  email: "",
  name: "",
  password: "",
  username: "",
  errors: {}
};

const authenticationForm = function(state = initialState, action) {
  switch(action.type) {
    case "ADD_AUTHENTICATION_ERRORS": {
      return {
        ...state,
        errors: action.payload
      }
    }

    case "UPDATE_AUTHENTICATION_FORM": {
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    }

    case "RESET_AUTHENTICATION_FORM": {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export default authenticationForm;

