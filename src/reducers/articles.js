export const articles = (state = {}, action) => {
  switch (action.type) {
    case "USER_ARTICLES":
      return {
        ...state,
        articles: action.payload || []
      };
    default:
      return state;
  }
};
