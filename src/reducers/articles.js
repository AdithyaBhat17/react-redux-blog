import {
  USER_ARTICLES,
  PUBLISHED_ARTICLES,
  ADD_FILTER_TAG,
  REMOVE_FILTER_TAG,
  CLEAR_FILTERS,
  PUBLISHED_ARTICLE,
  CLEAR_CURRENT_ARTICLE,
  CREATE_NEW_ARTICLE,
  SET_ERROR,
  SET_LOADING
} from "../actions/constants";

const articlesState = {
  filterTags: []
};

export const articles = (state = articlesState, action) => {
  switch (action.type) {
    case CREATE_NEW_ARTICLE:
      return {
        ...state,
        loading: !action.response,
        error: action.response.error,
        created: action.response.error ? false : true
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case USER_ARTICLES:
      return {
        ...state,
        userArticles: action.payload || []
      };
    case PUBLISHED_ARTICLES:
      return {
        ...state,
        published: action.payload || []
      };
    case ADD_FILTER_TAG:
      return {
        ...state,
        filterTags: [...state.filterTags, action.payload]
      };
    case REMOVE_FILTER_TAG:
      return {
        ...state,
        filterTags: state.filterTags?.filter(tag => tag !== action.payload)
      };
    case CLEAR_FILTERS:
      return { ...state, filterTags: [] };
    case PUBLISHED_ARTICLE:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT_ARTICLE:
      return { ...state, current: undefined };
    default:
      return state;
  }
};
