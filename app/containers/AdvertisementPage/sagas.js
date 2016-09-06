/**
 * Gets the categories from REST API
 */

import { take, call, put, select, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import config from '../../config';
import {
  loadAdvertisementAttachments,
  advertisementAttachmentsLoaded,
  advertisementAttachmentsLoadingError,
  loadAdvertisementPage,
  advertisementPageLoaded,
  advertisementPageLoadingError,
} from './actions';

import { selectAdvertisementId, selectAdvertisementBase } from './selectors';
import request from 'utils/request';

/**
 * Request categories from API
 */
export function* getAdvertisementAttachments() {
  const advertisementId = yield select(selectAdvertisementId());
  const requestURL = `${config.apiUrl}/attachments?advertisementId=${advertisementId}`;

  // Call our request helper (see 'utils/request')
  const attachments = yield call(request, requestURL);

  if (!attachments.error) {
    yield put(advertisementAttachmentsLoaded(attachments.data.items));
  } else {
    yield put(advertisementAttachmentsLoadingError(attachments.error));
  }
}

export function* getAdvertisement() {
  const advertisementBase = yield select(selectAdvertisementBase());
  const requestURL = `${config.apiUrl}/advertisements/${advertisementBase.get('advertisementId')}`;

  // Call our request helper (see 'utils/request')
  const advertisement = yield call(request, requestURL);
  if (!advertisement.error || advertisement.err) {
    yield put(advertisementPageLoaded(advertisement.data));
  } else {
    yield put(advertisementPageLoadingError(advertisement.error || advertisement.err));
  }
}
/**
 * Watches for LOAD_ADVERTISEMENTS action and calls handler
 */
export function* getAdvertisementAttachmentsWatcher() {
  yield take(loadAdvertisementAttachments);
  yield call(getAdvertisementAttachments);
}

/**
 * Watches for LOAD_ADVERTISEMENTS action and calls handler
 */
export function* getAdvertisementWatcher() {
  yield take(loadAdvertisementPage);
  yield call(getAdvertisement);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* apiData() {
  // Fork watcher so we can continue execution
  yield fork(getAdvertisementAttachmentsWatcher);
  yield fork(getAdvertisementWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
}

// Bootstrap sagas
export default [
  apiData,
];
