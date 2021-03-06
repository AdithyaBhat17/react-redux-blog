import { USER_AUTH, USER_AUTHENTICATED, USER_LOGGED_OUT } from "../actions/constants";

export const auth = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        message: {
          error: action.error ?? false,
          text:
            action.error?.message ||
            (action.response ? "Successfully logged in!" : "")
        },
        loading: !action.response && !action.error
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.user ? true : false,
        user: action.user
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
        message: undefined
      }
    default:
      return state;
  }
};
