import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import './item.scss';
import { dangerous } from '../../utilities/component';
import { escapeHtml, revertEscapeHtml } from '../../utilities/sanitize';
import pulsing from '../../constants/pulsing-values';
import materials from '../../constants/materials';
import ListGroup from '../list-group/list-group';
import ListGroupItem from '../list-group/list-group-item';
import ListGroupItemHeading from '../list-group/list-group-item-heading';
import ListGroupItemText from '../list-group/list-group-item-text';
import DangerButton from '../buttons/danger';
import PrimaryButton from '../buttons/primary';
import ModalEditor from './modal-editor';
import deriveProps from '../higher-order-components/derive-props';

const Dangerous = ({ children }) => <span dangerouslySetInnerHTML={dangerous(children)} />;

class DateTag extends PureComponent {
  getFormattedDate = () => {
    const { datePosted } = this.props;

    if (!datePosted) {
      return 'Date posted not found...';
    }

    const date = new Date(datePosted);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  render = () => (
    <ListGroupItem>
      <ListGroupItemHeading>Last Modified</ListGroupItemHeading>
      <ListGroupItemText>
        <Dangerous>{this.getFormattedDate()}</Dangerous>
      </ListGroupItemText>
    </ListGroupItem>
  );
}

DateTag.propTypes = {
  datePosted: PropTypes.string
};

class Item extends PureComponent {
  state = {};

  toggleExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  updateItem = item => {
    this.stopEditing();
    this.props.editItem(item);
  };

  edit = () => {
    this.setState({ editing: true });
  };

  stopEditing = () => {
    this.setState({ editing: false });
  };

  remove = () => {
    this.props.removeItem(this.props.item.id);
  };

  style = () => {
    return {
      display: this.props.filtered ? undefined : 'none'
    };
  };

  render() {
    const {
      props: { user, item, tag },
      state: { expanded, editing }
    } = this;

    return (
      <ListGroup className="items__item" style={this.style()}>
        <ListGroupItem>
          <ListGroupItemText>
            <div className="items__item__tag" dangerouslySetInnerHTML={dangerous(tag)} />
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem className="items__details-group-item" onClick={this.toggleExpanded}>
          <ListGroupItemHeading>Details</ListGroupItemHeading>
        </ListGroupItem>
        {expanded && (
          <div className="items__details__container">
            <ListGroupItem>
              <ListGroupItemHeading>Author</ListGroupItemHeading>
              <ListGroupItemText>{item.author}</ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Area</ListGroupItemHeading>
              <ListGroupItemText>
                <Dangerous>{item.area}</Dangerous>
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Mob</ListGroupItemHeading>
              <ListGroupItemText>
                <Dangerous>{item.mob}</Dangerous>
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Attack Noun</ListGroupItemHeading>
              <ListGroupItemText>
                <Dangerous>{item.attack_noun}</Dangerous>
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Hidden Affects</ListGroupItemHeading>
              <ListGroupItemText>
                <Dangerous>{item.hidden_affects}</Dangerous>
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Quest info</ListGroupItemHeading>
              <ListGroupItemText>
                <Dangerous>{item.quest_information}</Dangerous>
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Pulsing</ListGroupItemHeading>
              <ListGroupItemText>{pulsing[item.pulsing]}</ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Material</ListGroupItemHeading>
              <ListGroupItemText>{materials[item.material]}</ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading>Gate Point</ListGroupItemHeading>
              <ListGroupItemText>
                <Dangerous>{item.gate_point}</Dangerous>
              </ListGroupItemText>
            </ListGroupItem>
            <DateTag datePosted={item.date_posted} />
            {user && (
              <ListGroupItem>
                <DangerButton onClick={this.remove}>delete</DangerButton>{' '}
                <PrimaryButton onClick={this.edit}>edit</PrimaryButton>
              </ListGroupItem>
            )}
          </div>
        )}
        {editing && <ModalEditor item={item} open={editing} close={this.stopEditing} updateItem={this.updateItem} />}
      </ListGroup>
    );
  }
}

Item.propTypes = {
  filtered: PropTypes.bool,
  user: PropTypes.object,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
  tag: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.any,
    date_posted: PropTypes.string,
    tag: PropTypes.string,
    author: PropTypes.string,
    area: PropTypes.string,
    mob: PropTypes.string,
    attack_noun: PropTypes.string,
    hidden: PropTypes.string,
    material: PropTypes.number,
    pulsing: PropTypes.number,
    gate: PropTypes.string,
    quest_information: PropTypes.string
  })
};

const UPDATE_PATHS = ['item.tag'];
const derive = props => ({
  tag: escapeHtml(revertEscapeHtml(get(props, 'item.tag', '')))
});

export default deriveProps(derive, UPDATE_PATHS, 'tag')(Item);
