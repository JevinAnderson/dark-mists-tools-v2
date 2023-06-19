import React, { Component } from 'react';
import get from 'lodash/get';

import { isArray } from '../../utilities/type-comparison';

const deriveProps = (derive, updatePaths) => WrappedComponent => {
  const paths = isArray(updatePaths) ? updatePaths : [];

  class DerivationWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = derive(props);
    }

    componentWillReceiveProps(nextProps) {
      if (this.shouldDeriveNewProps(nextProps)) {
        const state = derive(nextProps);

        this.setState(state);
      }
    }

    shouldDeriveNewProps(nextProps) {
      if (paths.length === 0) {
        return true;
      }

      if (paths.some(path => get(nextProps, path) !== get(this.props, path))) {
        return true;
      }

      return false;
    }

    render() {
      const props = {
        ...this.props,
        ...this.state
      };

      return <WrappedComponent {...props} />;
    }
  }

  return DerivationWrapper;
};

export default deriveProps;
