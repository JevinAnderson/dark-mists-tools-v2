import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import './form.scss';
import { merge } from '../../utilities/component';
import { escapeHtml, revertEscapeHtml } from '../../utilities/sanitize';
import { capitalizeFirstLetter } from '../../utilities/strings';
import MATERIALS from '../../constants/materials';
import PULSING_INDICATORS from '../../constants/pulsing-indicators';
import LabeledInput from '../form-controls/labeled-input';
import LabeledSelect from '../form-controls/labeled-select';
import InputGroup from '../form-controls/input-group';
import deriveProps from '../higher-order-components/derive-props';

const NUMBER_MAP = {
  mats: true,
  pulsing: true
};

class ItemForm extends PureComponent {
  onChange = ({ target }) => {
    const key = target.getAttribute('data-item-key');
    let { value } = target;
    if (NUMBER_MAP[key]) {
      value = Number(value);
    }

    this.updateItem(key, value);
  };

  doesTagPulse(tag) {
    return PULSING_INDICATORS.some(indicator => tag.indexOf(indicator) !== -1);
  }

  materialFromTag(tag) {
    let material = (tag.match(/Material is (.*)\./g) || [''])[0].replace('Material is ', '').replace('.', '');
    material = capitalizeFirstLetter(material);
    const materialValue = MATERIALS.indexOf(material);

    return materialValue === -1 ? 0 : materialValue;
  }

  updateTag = ({ target: { value = '' } }) => {
    const { item } = this.props;
    let { pulsing = 0 } = item;
    pulsing = this.doesTagPulse(value) ? 1 : pulsing;
    const material = this.materialFromTag(value);
    const tag = escapeHtml(value);

    const changes = { pulsing, material, tag };

    this.updateItemWithAuthor(merge(item, changes));
  };

  updateItem(key, value) {
    const item = merge(this.props.item, {
      [key]: value
    });

    this.updateItemWithAuthor(item);
  }

  updateItemWithAuthor(item) {
    const { user, updateItem } = this.props;

    const author = get(user, 'displayName', item.author);

    updateItem(merge(item, { author }));
  }

  render() {
    const {
      props: { children, item, tag }
    } = this;

    return (
      <form className="item__form">
        <textarea rows={10} value={tag} className="form-control" data-item-key="tag" onChange={this.updateTag} />
        <LabeledInput
          value={item.author || ''}
          label="author"
          data-item-key="author"
          onChange={this.onChange}
          placeholder="Author"
        />
        <LabeledInput
          value={item.area || ''}
          label="area"
          data-item-key="area"
          onChange={this.onChange}
          placeholder="Area"
        />
        <LabeledInput
          value={item.mob || ''}
          label="mob"
          data-item-key="mob"
          onChange={this.onChange}
          placeholder="Mob"
        />
        <LabeledInput
          value={item.attack_noun || ''}
          label="noun"
          data-item-key="attack_noun"
          onChange={this.onChange}
          placeholder="Weapon Attack Noun"
        />
        <LabeledInput
          value={item.hidden_affects || ''}
          label="hidden"
          data-item-key="hidden_affects"
          onChange={this.onChange}
          placeholder="Hidden Item affects"
        />
        <LabeledInput
          value={item.gate || ''}
          label="gate"
          data-item-key="gate"
          onChange={this.onChange}
          placeholder="Gate Point"
        />
        <LabeledInput
          value={item.quest_information || ''}
          label="quest"
          data-item-key="quest_information"
          onChange={this.onChange}
          placeholder="Quest info"
        />
        <LabeledSelect value={item.pulsing || 0} label="pulsing" data-item-key="pulsing" onChange={this.onChange}>
          <option value="0">Not Sure</option>
          <option value="1">Pulses</option>
          <option value="2">Doesn't pulse</option>
        </LabeledSelect>
        {children && <InputGroup>{children}</InputGroup>}
      </form>
    );
  }
}

ItemForm.propTypes = {
  children: PropTypes.any,
  item: PropTypes.object,
  tag: PropTypes.string,
  user: PropTypes.any,
  updateItem: PropTypes.func
};

ItemForm.defaultProps = {
  item: {},
  updateItem: item => {
    console.log('%cform.js default updateItem item: ', 'color:green', item);
  }
};

const UPDATE_PATHS = ['item.tag'];
const derive = props => ({
  tag: revertEscapeHtml(get(props, 'item.tag', ''))
});

const mapStateToProps = ({ user }, ownProps) => ({
  ...ownProps,
  user
});

export default compose(
  connect(mapStateToProps),
  deriveProps(derive, UPDATE_PATHS, 'tag')
)(ItemForm);
