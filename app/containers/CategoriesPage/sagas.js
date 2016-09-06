/**
 * Gets the categories from REST API
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import config from '../../config';
import {
  LOAD_CATEGORIES,
  LOAD_ADVERTISEMENTS,
} from 'containers/App/constants';
import {
  categoriesLoaded,
  categoriesLoadingError,
  advertisementsLoaded,
  advertisementsLoadingError,
} from 'containers/App/actions';

import { selectAdvertisementsFilters } from 'containers/App/selectors';
import request from 'utils/request';

/**
 * Request categories from API
 */
export function* getCategories() {
  const requestURL = `${config.apiUrl}/categories`;

  // Call our request helper (see 'utils/request')
  const categories = yield call(request, requestURL);

  if (!categories.error) {
    yield put(categoriesLoaded(categories.data.items));
  } else {
    yield put(categoriesLoadingError(categories.error));
  }
}

/**
 * Request advertisements from API
 */
export function* getAdvertisements() {
  let requestURL = `${config.apiUrl}/advertisements?status=published`;
  const filters = yield select(selectAdvertisementsFilters());
  if (typeof filters === 'object') {
    Object.keys(filters).forEach((key) => {
      requestURL = `${requestURL}&${key}=${filters[key]}`;
    });
  }

  const advertisements = yield call(request, requestURL, {
    status: 'published',
  });

  if (!advertisements.error) {
    yield put(advertisementsLoaded(advertisements.data.items));
  } else {
    yield put(advertisementsLoadingError(advertisements.error));
  }
}

/**
 * Watches for LOAD_CATEGORIES action and calls handler
 */
export function* getCategoriesWatcher() {
  while (yield take(LOAD_CATEGORIES)) {
    yield call(getCategories);
  }
}

/**
 * Watches for LOAD_ADVERTISEMENTS action and calls handler
 */
export function* getAdvertisementsWatcher() {
  while (yield take(LOAD_ADVERTISEMENTS)) {
    yield call(getAdvertisements);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* apiData() {
  // Fork watcher so we can continue execution
  const categoriesWatcher = yield fork(getCategoriesWatcher);
  const advertisementsWatcher = yield fork(getAdvertisementsWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(categoriesWatcher);
  yield cancel(advertisementsWatcher);
}

// Bootstrap sagas
export default [
  apiData,
];
