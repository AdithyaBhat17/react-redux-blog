import {
  USER_ARTICLES,
  PUBLISHED_ARTICLES,
  ADD_FILTER_TAG,
  REMOVE_FILTER_TAG,
  CLEAR_FILTERS,
  PUBLISHED_ARTICLE,
  CLEAR_CURRENT_ARTICLE
} from '../actions/constants';

const articlesState = {
  filterTags: []
}

export const articles = (state = articlesState, action) => {
  switch (action.type) {
    case USER_ARTICLES:
      return {
        ...state,
        user: action.payload || []
      };
    case PUBLISHED_ARTICLES:
      return {
        ...state,
        published: action.payload || []
      }
    case ADD_FILTER_TAG:
      return {
        ...state,
        filterTags: [...state.filterTags, action.payload]
      }
    case REMOVE_FILTER_TAG:
      return {
        ...state,
        filterTags: state.filterTags?.filter(tag => tag !== action.payload)
      }
    case CLEAR_FILTERS:
      return { ...state, filterTags: [] }
    case PUBLISHED_ARTICLE:
      return { ...state, current: action.payload }
    case CLEAR_CURRENT_ARTICLE:
      return { ...state, current: undefined }
    default:
      return state;
  }
};
