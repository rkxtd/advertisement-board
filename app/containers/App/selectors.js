/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectCategories = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'categories'])
);

const selectCategoriesError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('categoriesError')
);

const selectCategoriesLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('categoriesLoading')
);

const selectAdvertisements = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'advertisements'])
);

const selectAdvertisementsError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('advertisementsError')
);

const selectAdvertisementsLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('advertisementsLoading')
);

const selectAdvertisementsFilters = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('advertisementsFilters')
);


export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
  selectAdvertisements,
  selectAdvertisementsError,
  selectAdvertisementsLoading,
  selectAdvertisementsFilters,
};
