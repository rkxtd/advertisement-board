import React from 'react';

import A from 'components/A';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import styles from './styles.css';

function ListAdvertisements(props) {
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
      {props.items.map((item) => (<li className={styles.listItem} key={item.id}>
        <A onClick={() => props.changeRoute(`/advertisement/${item.id}`)} href="#">
          <img width="120" height="120" alt={item.title} src={item.imgUrl || 'http://rsk-an.com/templates/rskan/img/project/mhat/in/no_photo.png'} />
          <p className={styles.listItemTitle}>
            {item.title}
          </p>
          <p className={styles.listItemPrice}>
            Ціна: {item.price} $
          </p>
          <p className={styles.listItemViews}>
            Переглядів: {item.views || 0}
          </p>
        </A>
      </li>)
      )}
    </div>);
  }

  return (<div></div>);
}

ListAdvertisements.propTypes = {
  changeRoute: React.PropTypes.func,
  items: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export default ListAdvertisements;
