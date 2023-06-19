import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as UserActions from '../../actions/user';

const withUser = () => WrappedComponent => {
  const mapStateToProps = ({ user }, ownProps) => ({
    ...ownProps,
    user
  });

  return connect(
    mapStateToProps,
    UserActions
  )(WrappedComponent);
};

export default withUser;
