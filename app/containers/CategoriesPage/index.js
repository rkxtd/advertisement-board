/*
 * CategoriesPage
 *
 * List all the categories
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import H2 from 'components/H2';
import ListCategories from 'components/ListCategories';
import ListAdvertisements from 'components/ListAdvertisements';

import { createStructuredSelector } from 'reselect';
import styles from './styles.css';

import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
  selectAdvertisements,
  selectAdvertisementsLoading,
  selectAdvertisementsError,
  selectAdvertisementsFilters,
} from 'containers/App/selectors';

import {
  loadCategories,
  loadAdvertisements,
} from '../App/actions';


export class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.openAdvertisementsPage = this.openAdvertisementsPage.bind(this);
  }

  componentWillMount = () => {
    this.props.loadCategories();
    this.props.loadAdvertisements();
  };
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Filters advertisements based on selected category (Toogle)
   * @param  {integer} Id of the Category
   */
  filterByCategory = (categoryId) => {
    const filters = {};
    if (this.props.advertisementsFilters.categoryId !== categoryId) {
      filters.categoryId = categoryId;
    }
    this.props.loadAdvertisements(false, filters);
  };

  /**
   * Changed route to Advertisement page
   * @param  {integer} Id of the Advertisement
   */
  openAdvertisementsPage = (id) => {
    this.openRoute(`/advertisement/${id}`);
  };

  render() {
    let filteredCategoryId = this.props.advertisementsFilters.categoryId || false;
    const me = this;

    return (
      <div>
        <Helmet
          title="Categories Page"
          meta={[
            { name: 'description', content: 'List of VLAB Categories' },
          ]}
        />
        <H2>
          Категорії
        </H2>
        <ul className={styles.list}>
          <ListCategories
            items={this.props.categories}
            filteredItemId={filteredCategoryId}
            filterByItem={me.filterByCategory}
            loading={this.props.categoriesLoading}
            error={this.props.categoriesError}
          />
        </ul>

        <H2>
          Оголошення
        </H2>
        <ul className={styles.list}>
          <ListAdvertisements
            items={this.props.advertisements}
            loading={this.props.advertisementsLoading}
            error={this.props.advertisementsError}
            changeRoute={me.props.changeRoute}
          />
        </ul>
      </div>
    );
  }
}

CategoriesPage.propTypes = {
  changeRoute: React.PropTypes.func,
  loadCategories: React.PropTypes.func,
  loadAdvertisements: React.PropTypes.func,
  categoriesLoading: React.PropTypes.bool,
  advertisementsFilters: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  advertisements: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  advertisementsLoading: React.PropTypes.bool,
  advertisementsError: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  categoriesError: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  categories: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    loadCategories: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadCategories());
    },
    loadAdvertisements: (evt, filters = {}) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadAdvertisements(filters));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategories(),
  categoriesLoading: selectCategoriesLoading(),
  categoriesError: selectCategoriesError(),
  advertisements: selectAdvertisements(),
  advertisementsLoading: selectAdvertisementsLoading(),
  advertisementsError: selectAdvertisementsError(),
  advertisementsFilters: selectAdvertisementsFilters(),
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
