import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as LoaderActions from '../../actions/loader';

const withLoaderControls = () => WrappedComponent => {
  const mapStateToProps = ({ loader: { loading } }, ownProps) => ({
    ...ownProps,
    loading
  });

  return connect(
    mapStateToProps,
    LoaderActions
  )(WrappedComponent);
};

export default withLoaderControls;
