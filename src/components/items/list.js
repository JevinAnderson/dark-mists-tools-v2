import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import memoize from 'lodash/memoize';

import Panel from '../panel/panel';
import Item from './item';

const getWeightFromTag = memoize(function weightFromTag(tag) {
  const found = tag.match(/Weight is (?<weight>[0-9]+\.?[0-9]*) pounds/i);

  if (found && found.groups && found.groups.weight) {
    return parseFloat(found.groups.weight) || 0;
  }

  return null;
});

class List extends PureComponent {
  simpleSearch(item) {
    const {
      item_search: { keyword }
    } = this.props;

    return !keyword || item.tag.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
  }

  advancedSearch(item) {
    let {
      item_search: {
        keywords = [],
        exclusions = [],
        keywordsSearchType = 'any',
        pulsing = 'yes',
        material = 'any',
        weight,
        weightType
      }
    } = this.props;

    if (pulsing === 'no' && item.pulsing != '2') {
      return false;
    }

    if (material !== 'any' && item.material != material) {
      return false;
    }

    keywords = keywords.filter(keyword => keyword.trim());
    const tag = item.tag.toLowerCase();

    exclusions = exclusions.filter(Boolean).map(exclusion => exclusion.toLowerCase());
    if (exclusions.some(exclusion => tag.indexOf(exclusion) !== -1)) {
      return false;
    }

    if (weight) {
      const parsedWeight = parseFloat(weight) || 0;
      const tagWeight = getWeightFromTag(item.tag);
      if (tagWeight !== null) {
        if (weightType === '>' && tagWeight < parsedWeight) {
          return false;
        } else if (weightType === '<' && tagWeight > parsedWeight) {
          return false;
        }
      }
    }

    if (keywords.length === 0) return true;

    if (keywordsSearchType === 'any') {
      if (keywords.every(keyword => tag.indexOf(keyword.toLowerCase()) === -1)) {
        return false;
      }
    } else {
      if (keywords.some(keyword => tag.indexOf(keyword.toLowerCase()) === -1)) {
        return false;
      }
    }

    return true;
  }

  isItemVisible(item) {
    if (this.props.item_search.showAdvancedSearch) {
      return this.advancedSearch(item);
    } else {
      return this.simpleSearch(item);
    }
  }

  render() {
    const { items = [], user, editItem, removeItem } = this.props;

    return (
      <Panel className="items__list">
        {items.map(item => (
          <Item
            key={item.id}
            user={user}
            item={item}
            editItem={editItem}
            removeItem={removeItem}
            filtered={this.isItemVisible(item)}
          />
        ))}
      </Panel>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  keyword: PropTypes.string,
  user: PropTypes.object,
  editItem: PropTypes.func,
  removeItem: PropTypes.func
};

const mapStateToProps = ({ items, item_search, user }, ownProps) => ({
  items,
  item_search,
  user,
  ...ownProps
});

export default connect(mapStateToProps)(List);
