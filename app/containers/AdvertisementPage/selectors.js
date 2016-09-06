/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectAdvertisementBase = () => (state) => state.get('advertisement');

const selectAdvertisement = () => createSelector(
  selectAdvertisementBase(),
  (localState) => localState.get('advertisement')
);

const selectAdvertisementError = () => createSelector(
  selectAdvertisementBase(),
  (localState) => localState.get('advertisementError')
);

const selectAdvertisementLoading = () => createSelector(
  selectAdvertisementBase(),
  (localState) => localState.get('advertisementLoading')
);


const selectAdvertisementAttachments = () => createSelector(
  selectAdvertisementBase(),
  (localState) => localState.get('advertisementAttachments')
);

const selectAdvertisementAttachmentsError = () => createSelector(
  selectAdvertisementBase(),
  (localState) => localState.get('advertisementAttachmentsError')
);

const selectAdvertisementAttachmentsLoading = () => createSelector(
  selectAdvertisementBase(),
  (localState) => localState.get('advertisementAttachmentsLoading')
);

const selectAdvertisementId = () => createSelector(
  selectAdvertisementBase(),
  (localState) => localState.get('advertisementId')
);

export {
  selectAdvertisementBase,
  selectAdvertisementAttachments,
  selectAdvertisementAttachmentsError,
  selectAdvertisementAttachmentsLoading,
  selectAdvertisement,
  selectAdvertisementError,
  selectAdvertisementLoading,
  selectAdvertisementId,
};
