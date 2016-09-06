/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_ADVERTISEMENTS,
  LOAD_ADVERTISEMENTS_SUCCESS,
  LOAD_ADVERTISEMENTS_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

/**
 * Load the categories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_CATEGORIES
 */
export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
  };
}

/**
 * Dispatched when the categories are loaded by the request saga
 *
 * @param  {array} categories The categories data
 *
 * @return {object}      An action object with a type of LOAD_CATEGORIES_SUCCESS passing the categories
 */
export function categoriesLoaded(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    categories,
  };
}

/**
 * Dispatched when loading the categories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_CATEGORIES_ERROR passing the error
 */
export function categoriesLoadingError(error) {
  return {
    type: LOAD_CATEGORIES_ERROR,
    error,
  };
}

/**
 * Load the advertisements, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENTS
 */
export function loadAdvertisements(filters) {
  return {
    type: LOAD_ADVERTISEMENTS,
    filters,
  };
}

/**
 * Dispatched when the advertisements are loaded by the request saga
 *
 * @param  {array}  The advertisements data
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENTS_SUCCESS passing the advertisements
 */
export function advertisementsLoaded(advertisements) {
  return {
    type: LOAD_ADVERTISEMENTS_SUCCESS,
    advertisements,
  };
}

/**
 * Dispatched when loading the advertisements fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENTS_ERROR passing the error
 */
export function advertisementsLoadingError(error) {
  return {
    type: LOAD_ADVERTISEMENTS_ERROR,
    error,
  };
}
