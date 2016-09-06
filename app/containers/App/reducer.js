/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_ADVERTISEMENTS,
  LOAD_ADVERTISEMENTS_SUCCESS,
  LOAD_ADVERTISEMENTS_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  route: false,
  loading: false,
  categoriesLoading: false,
  advertisementsLoading: false,
  error: false,
  categoriesError: false,
  advertisementsError: false,
  advertisementsFilters: false,
  currentUser: false,
  linkActive: false,
  linkPrevious: false,
  userData: fromJS({
    repositories: false,
    categories: false,
    advertisements: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_CATEGORIES:
      return state
        .set('categoriesLoading', true)
        .set('categoriesError', false)
        .setIn(['userData', 'categories'], false);
    case LOAD_CATEGORIES_SUCCESS:
      return state
        .setIn(['userData', 'categories'], action.categories)
        .set('categoriesLoading', false);
    case LOAD_CATEGORIES_ERROR:
      return state
        .set('categoriesError', action.error)
        .set('categoriesLoading', false);
    case LOAD_ADVERTISEMENTS:
      return state
        .set('advertisementsLoading', true)
        .set('advertisementsError', false)
        .set('advertisementsFilters', action.filters)
        .setIn(['userData', 'advertisements'], false);
    case LOAD_ADVERTISEMENTS_SUCCESS:
      return state
        .setIn(['userData', 'advertisements'], action.advertisements)
        .set('advertisementsLoading', false);
    case LOAD_ADVERTISEMENTS_ERROR:
      return state
        .set('advertisementsError', action.error)
        .set('advertisementsLoading', false);
    default:
      return state;
  }
}

export default appReducer;
