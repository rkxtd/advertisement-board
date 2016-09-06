/*
 * CategoriesPage
 *
 * List all the categories
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AdvertisementItem from 'components/AdvertisementItem';
import Helmet from 'react-helmet';

import { createStructuredSelector } from 'reselect';

import {
  selectAdvertisementAttachments,
  selectAdvertisementAttachmentsLoading,
  selectAdvertisementAttachmentsError,
  selectAdvertisement,
  selectAdvertisementLoading,
  selectAdvertisementError,
} from './selectors';

import {
  loadAdvertisementPage,
  loadAdvertisementAttachments,
} from './actions';
import { selectLocationState } from 'containers/App/selectors';

export class AdvertisementPage extends React.Component {
  componentWillMount = () => {
    const advertisementId = this.props.activeUrlRoutine.locationBeforeTransitions.pathname.replace('/advertisement/', '');
    console.log('Load advertisement: #', advertisementId);
    this.props.loadAdvertisement(false, advertisementId);
  };
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  render() {
    return (<div>
      <Helmet
        title={`VLAB: ${this.props.advertisement.title}`}
        meta={[
          { name: 'description', content: 'Advertisement page' },
        ]}
      />
      <AdvertisementItem
        advertisementPageLoading={this.props.advertisementPageLoading}
        advertisementPageError={this.props.advertisementPageError}
        advertisement={this.props.advertisement}
        advertisementAttachments={this.props.advertisementAttachments}
        advertisementAttachmentsLoading={this.props.advertisementAttachmentsLoading}
        advertisementAttachmentsError={this.props.advertisementAttachmentsError}
      />
    </div>);
  }
}

AdvertisementPage.propTypes = {
  changeRoute: React.PropTypes.func,
  loadAdvertisement: React.PropTypes.func,
  activeUrlRoutine: React.PropTypes.object,
  advertisementPageLoading: React.PropTypes.bool,
  advertisementPageError: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  advertisement: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  advertisementLoading: React.PropTypes.bool,
  advertisementError: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  advertisementAttachments: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  advertisementAttachmentsLoading: React.PropTypes.bool,
  advertisementAttachmentsError: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    loadAdvertisement: (evt, advertisementId) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadAdvertisementPage(advertisementId));
    },
    loadAdvertisementAttachments: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadAdvertisementAttachments());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  advertisementAttachments: selectAdvertisementAttachments(),
  advertisementAttachmentsLoading: selectAdvertisementAttachmentsLoading(),
  advertisementAttachmentsError: selectAdvertisementAttachmentsError(),
  advertisement: selectAdvertisement(),
  advertisementLoading: selectAdvertisementLoading(),
  advertisementError: selectAdvertisementError(),
  activeUrlRoutine: selectLocationState(),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementPage);
