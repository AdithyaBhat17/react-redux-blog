import { fetcher } from "../api";

const userArticles = payload => {
  return {
    type: "USER_ARTICLES",
    payload
  };
};

export const getUserArticles = (url, method) => {
  return dispatch => {
    fetcher(url, method)
      .then(response => dispatch(userArticles(response)))
      .catch(error => console.error(error));
  };
};
