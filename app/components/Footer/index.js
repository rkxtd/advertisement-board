import React from 'react';

import messages from './messages';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>
          <FormattedMessage {...messages.licenseMessage} />
        </p>
      </section>

      <section>
        <p>
          Author: <a href="http://comanche.pp.ua">Roman Shuvaryk</a>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
