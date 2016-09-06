import React from 'react';

import A from 'components/A';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import styles from './styles.css';

function ListCategories(props) {
  if (props.loading) {
    return (<List component={LoadingIndicator} />);
    // Show an error if there is one
  } else if (props.error) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return (<List component={ErrorComponent} />);
    // If we're not loading, don't have an error and there are categories, show the categories
  } else if (props.items.length) {
    return (<div>
      {props.items.map((item) => (<li className={(props.filteredItemId === item.id) ? `${styles.selectedItem} ${styles.listItem}` : styles.listItem} key={item.id}>
        <A onClick={() => props.filterByItem(item.id)} href="#">
          <img width="50" height="60" src={item.imgUrl} alt={item.title} />
          <p className={styles.listItemTitle}>
            {item.name}
          </p>
        </A>
      </li>)
      )}
    </div>);
  }

  return (<div></div>);
}

ListCategories.propTypes = {
  items: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  filterByItem: React.PropTypes.func,
  filteredItemId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export default ListCategories;
