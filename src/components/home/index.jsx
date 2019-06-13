import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';

import Banner from './Banner';
import Page1 from './Page1';
// import Page2 from './Page2';

function Home(props) {
  return (
    <DocumentTitle title="Old Drivers">
      <div className="home-wrapper">
        <Banner {...props} />
        <Page1 {...props} />
      </div>
    </DocumentTitle>
  );
}

export default injectIntl(Home);
