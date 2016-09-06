import {
  LOAD_ADVERTISEMENT_ATTACHMENTS,
  LOAD_ADVERTISEMENT_ATTACHMENTS_SUCCESS,
  LOAD_ADVERTISEMENT_ATTACHMENTS_ERROR,
  LOAD_ADVERTISEMENT_PAGE,
  LOAD_ADVERTISEMENT_PAGE_SUCCESS,
  LOAD_ADVERTISEMENT_PAGE_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the reducer
const initialState = fromJS({
  advertisementId: false,
  advertisement: false,
  advertisementLoading: false,
  advertisementError: false,
  advertisementAttachments: false,
  advertisementAttachmentsLoading: false,
  advertisementAttachmentsError: false,
});

function advertisementAttachementReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ADVERTISEMENT_PAGE:
      return state
        .set('advertisementId', action.advertisementId)
        .set('advertisementLoading', true)
        .set('advertisementError', false)
        .set('advertisement', false);
    case LOAD_ADVERTISEMENT_PAGE_SUCCESS:
      return state
        .set('advertisementLoading', false)
        .set('advertisementError', false)
        .set('advertisement', action.advertisement);
    case LOAD_ADVERTISEMENT_PAGE_ERROR:
      return state
        .set('advertisementLoading', false)
        .set('advertisementError', action.error);
    case LOAD_ADVERTISEMENT_ATTACHMENTS:
      return state
        .set('advertisementAttachmentsLoading', true)
        .set('advertisementAttachmentsError', false)
        .set('advertisementAttachments', []);
    case LOAD_ADVERTISEMENT_ATTACHMENTS_SUCCESS:
      return state
        .set('advertisementAttachments', action.advertisementAttachments)
        .set('advertisementAttachmentsLoading', false);
    case LOAD_ADVERTISEMENT_ATTACHMENTS_ERROR:
      return state
        .set('advertisementAttachmentsError', action.error)
        .set('advertisementAttachmentsLoading', false);
    default:
      return state;
  }
}

export default advertisementAttachementReducer;

