import React, { Component } from 'react';
import get from 'lodash/get';

const smartUpdate = (...deltaIdentifiers) => WrappedComponent => {
  class SmartUpdate extends Component {
    shouldComponentUpdate(nextProps) {
      return deltaIdentifiers.some(path => get(this.props, path) !== get(nextProps, path));
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return SmartUpdate;
};

export default smartUpdate;
