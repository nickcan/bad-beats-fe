const initialState = {
  email: "",
  name: "",
  password: "",
  username: ""
};

const authenticationForm = function(state = initialState, action) {
  switch(action.type) {
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

