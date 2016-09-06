/*
 * Home Actions
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
  LOAD_ADVERTISEMENT_ATTACHMENTS,
  LOAD_ADVERTISEMENT_ATTACHMENTS_SUCCESS,
  LOAD_ADVERTISEMENT_ATTACHMENTS_ERROR,
  LOAD_ADVERTISEMENT_PAGE,
  LOAD_ADVERTISEMENT_PAGE_SUCCESS,
  LOAD_ADVERTISEMENT_PAGE_ERROR,
} from './constants';

/**
 * Load the advertisement attachments, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENT_ATTACHMENTS
 */
export function loadAdvertisementAttachments() {
  return {
    type: LOAD_ADVERTISEMENT_ATTACHMENTS,
  };
}

/**
 * Dispatched when the advertisement attachments are loaded by the request saga
 *
 * @param  {array}  The advertisement Attachments data
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENT_ATTACHMENTS_SUCCESS passing the advertisement Attachments
 */
export function advertisementAttachmentsLoaded(advertisementAttachments) {
  return {
    type: LOAD_ADVERTISEMENT_ATTACHMENTS_SUCCESS,
    advertisementAttachments,
  };
}

/**
 * Dispatched when loading the advertisement Attachments fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENT_ATTACHMENTS_ERROR passing the error
 */
export function advertisementAttachmentsLoadingError(error) {
  return {
    type: LOAD_ADVERTISEMENT_ATTACHMENTS_ERROR,
    error,
  };
}

/**
 * Dispatched when load advertisement page
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENT_PAGE
 */
export function loadAdvertisementPage(advertisementId) {
  return {
    type: LOAD_ADVERTISEMENT_PAGE,
    advertisementId,
  };
}

/**
 * Dispatched when the advertisement attachments are loaded by the request saga
 *
 * @param  {array}  The advertisement data
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENT_PAGE_SUCCESS passing the advertisement Page
 */
export function advertisementPageLoaded(advertisement) {
  return {
    type: LOAD_ADVERTISEMENT_PAGE_SUCCESS,
    advertisement,
  };
}

/**
 * Dispatched when loading the advertisement page fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_ADVERTISEMENT_PAGE_ERROR passing the error
 */
export function advertisementPageLoadingError(error) {
  return {
    type: LOAD_ADVERTISEMENT_PAGE_ERROR,
    error,
  };
}
