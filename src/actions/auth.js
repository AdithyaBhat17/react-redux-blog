import { USER_AUTH, USER_AUTHENTICATED } from "./constants";
import client from "../utils/firebase";

export const userAuthenticated = user => {
  return {
    type: USER_AUTHENTICATED,
    user
  };
};

export const userAuth = (newUser, email, password) => {
  return async dispatch => {
    let response;
    try {
      if (newUser) {
        response = await client
          .auth()
          .createUserWithEmailAndPassword(email, password);
      } else {
        response = await client
          .auth()
          .signInWithEmailAndPassword(email, password);
      }
      dispatch({ type: USER_AUTH, response });
    } catch (error) {
      dispatch({ type: USER_AUTH, error });
    }
  };
};
