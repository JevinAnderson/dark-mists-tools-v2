import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { DangerousSpan } from "../dangerous";
import { escapeHtml, revertEscapeHtml } from "../../utilities/sanitize";
import pulsing from "../../constants/pulsing-values";
import materials from "../../constants/materials";
import ModalEditor from "./modal-editor";
import deriveProps from "../higher-order-components/derive-props";
import { formatDate } from "../../utilities/date";
import SLOTS from "../../constants/slots";

class Item extends PureComponent {
  state = {};

  toggleExpanded = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  updateItem = (item) => {
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
      display: this.props.filtered ? undefined : "none",
    };
  };

  render() {
    const {
      props: { user, item, tag },
      state: { expanded, editing },
    } = this;

    if (!this.props.filtered) {
      return null;
    }

    return (
      <ListGroup style={this.style()} className="mb-4">
        <ListGroup.Item>
          <DangerousSpan>{tag}</DangerousSpan>
        </ListGroup.Item>
        <ListGroup.Item
          className="pointer secondaryBackgroundOnHover"
          onClick={this.toggleExpanded}
        >
          Details
        </ListGroup.Item>
        {expanded && (
          <>
            <ListGroup.Item>
              <div className="fw-bold">Author</div>
              {item.author}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Area</div>
              {item.area}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Mob</div>
              {item.mob}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Slot</div>
              {SLOTS[get(item, "slot", 0)]}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Attack Noun</div>
              {item.attack_noun}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Hidden Affects</div>
              {item.hidden_affects}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Quest Info</div>
              {item.quest_information}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Pulsing</div>
              {pulsing[item.pulsing]}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Material</div>
              {materials[item.material]}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Gate Point</div>
              {item.gate_point}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="fw-bold">Last Modified</div>
              {formatDate(item.date_posted)}
            </ListGroup.Item>
            {user && (
              <ListGroup.Item>
                <Button variant="danger" className="me-2" onClick={this.remove}>
                  delete
                </Button>
                <Button variant="primary" className="me-2" onClick={this.edit}>
                  edit
                </Button>
              </ListGroup.Item>
            )}
            {editing && (
              <ModalEditor
                header="Edit Item"
                item={item}
                open={editing}
                close={this.stopEditing}
                updateItem={this.updateItem}
              />
            )}
          </>
        )}
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
    quest_information: PropTypes.string,
  }),
};

const UPDATE_PATHS = ["item.tag"];
const derive = (props) => ({
  tag: escapeHtml(revertEscapeHtml(get(props, "item.tag", ""))),
});

export default deriveProps(derive, UPDATE_PATHS, "tag")(Item);
