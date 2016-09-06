import React from 'react';

import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

const styles = {};

function AdvertisementItem(props) {
  const getThumbnail = (filepath) => filepath.replace(/\.png|\.jpg/gi, (ext) => `.150px${ext}`);

  // Show a loading indicator when we're loading
  if (props.advertisementPageLoading) {
    return (<List component={LoadingIndicator} />);
  } else if (props.advertisementPageError) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return (<List component={ErrorComponent} />);
  } else if (props.advertisement) {
    return (
      <div>
        <H2>
          {props.advertisement.title}
        </H2>
        <div className={styles.params}>
          <span><b>Оголошення розміщено:</b> {props.advertisement.created}</span> <br />
          <span><b>Опис:</b> {props.advertisement.desc}</span>
          <span><b>Переглядів:</b> {props.advertisement.views}</span> <br />
          <span><b>Ціна:</b> {props.advertisement.price}</span>$ <br />
        </div>
        <br />
        <div className={styles.gallery}>
          {props.advertisementAttachments.map((attachment) => (<img src={getThumbnail(attachment.filepath)} alt={attachment.comment} />))}
        </div>
      </div>
    );
  }

  return (<div></div>);
}

AdvertisementItem.propTypes = {
  advertisementPageLoading: React.PropTypes.bool,
  advertisementPageError: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  advertisement: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  advertisementAttachments: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

export default AdvertisementItem;
