import { fetcher } from "../api";
import {
  USER_ARTICLES,
  PUBLISHED_ARTICLES,
  ADD_FILTER_TAG,
  REMOVE_FILTER_TAG,
  CLEAR_FILTERS,
  PUBLISHED_ARTICLE,
  CLEAR_CURRENT_ARTICLE
} from './constants';

export const getUserArticles = () => {
  return dispatch => {
    fetcher("https://cors-anywhere.herokuapp.com/https://dev.to/api/articles/me/all")
      .then(response =>
        dispatch({
          type: USER_ARTICLES,
          payload: response
        })
      )
      .catch(error => console.error(error));
  };
};

export const getPublishedArticles = () => dispatch => {
  fetcher('https://cors-anywhere.herokuapp.com/https://dev.to/api/articles')
    .then(response =>
      dispatch({
        type: PUBLISHED_ARTICLES,
        payload: response
      })
    )
    .catch(error => console.error(error));
}

export const toggleTagsSelection = (tag, isSelected = true) => {
  return {
    type: isSelected ? ADD_FILTER_TAG : REMOVE_FILTER_TAG,
    payload: tag
  };
}

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS
  }
}

export const getArticle = (articleId) => async dispatch => {
  fetcher(`https://cors-anywhere.herokuapp.com/https://dev.to/api/articles/${articleId}`)
    .then(response =>
      dispatch({
        type: PUBLISHED_ARTICLE,
        payload: response
      })
    )
    .catch(error => console.error(error));
}

export const clearCurrentArticle = () => {
  return {
    type: CLEAR_CURRENT_ARTICLE
  }
}
