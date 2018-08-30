import React from 'react';
import PropTypes from 'prop-types';

const containerStyle = {
  height: '100%',
  marginTop: '10vh',
};

export const PageLayout = ({ children }) => (
  <div className="container" style={containerStyle} >
    <div className="row">
      <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        {children}
      </div>
    </div>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
