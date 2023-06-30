import React, { PureComponent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from "lodash/get";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { merge } from "../../utilities/component";
import { escapeHtml, revertEscapeHtml } from "../../utilities/sanitize";
import { capitalizeFirstLetter } from "../../utilities/strings";
import MATERIALS from "../../constants/materials";
import PULSING_INDICATORS from "../../constants/pulsing-indicators";
import deriveProps from "../higher-order-components/derive-props";
import SLOTS from "../../constants/slots";

const NUMBER_MAP = {
  mats: true,
  pulsing: true,
};

class ItemForm extends PureComponent {
  onChange = ({ target }) => {
    const key = target.getAttribute("data-item-key");
    let { value } = target;
    if (NUMBER_MAP[key]) {
      value = Number(value);
    }

    this.updateItem(key, value);
  };

  doesTagPulse(tag) {
    return PULSING_INDICATORS.some(
      (indicator) => tag.indexOf(indicator) !== -1
    );
  }

  materialFromTag(tag = "") {
    let material = (tag.match(/Material is (.*)\./g) || [""])[0]
      .replace("Material is ", "")
      .replace(".", "");
    material = capitalizeFirstLetter(material);
    const materialValue = MATERIALS.indexOf(material);

    return materialValue === -1 ? 0 : materialValue;
  }

  updateTag = ({ target: { value = "" } }) => {
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
      [key]: value,
    });

    this.updateItemWithAuthor(item);
  }

  updateItemWithAuthor(item) {
    const { user, updateItem } = this.props;

    const author = get(user, "displayName", item.author);

    updateItem(merge(item, { author }));
  }

  render = () => {
    const { item, tag } = this.props;

    return (
      <Form>
        <Form.Group className="mb-1">
          <Form.Control
            onChange={this.updateTag}
            value={tag}
            data-item-key="tag"
            as="textarea"
            rows={6}
          />
        </Form.Group>
        <InputGroup className="mb-1">
          <InputGroup.Text>Author</InputGroup.Text>
          <Form.Control
            value={item.author}
            data-item-key="author"
            onChange={this.onChange}
            placeholder="Author"
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Area</InputGroup.Text>
          <Form.Control
            placeholder="Area"
            value={item.area || ""}
            data-item-key="area"
            onChange={this.onChange}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Mob</InputGroup.Text>
          <Form.Control
            placeholder="Mob"
            value={item.mob || ""}
            data-item-key="mob"
            onChange={this.onChange}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Slot</InputGroup.Text>
          <Form.Select
            value={get(item, "slot", 0)}
            data-item-key="slot"
            onChange={this.onChange}
          >
            {SLOTS.map((slot, index) => (
              <option key={slot} value={index}>
                {slot}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Noun</InputGroup.Text>
          <Form.Control
            placeholder="Weapon Attack Noun"
            value={item.attack_noun || ""}
            data-item-key="attack_noun"
            onChange={this.onChange}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Hidden</InputGroup.Text>
          <Form.Control
            placeholder="Hidden Item Affects"
            value={item.hidden_affects || ""}
            data-item-key="hidden_affects"
            onChange={this.onChange}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Gate</InputGroup.Text>
          <Form.Control
            placeholder="Gate Point"
            value={item.gate || ""}
            data-item-key="gate"
            onChange={this.onChange}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Quest</InputGroup.Text>
          <Form.Control
            placeholder="Quest Info"
            value={item.quest_information || ""}
            data-item-key="quest_information"
            onChange={this.onChange}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Pulsing</InputGroup.Text>
          <Form.Select
            value={item.pulsing || 0}
            data-item-key="pulsing"
            onChange={this.onChange}
          >
            <option value="0">Not Sure</option>
            <option value="1">Pulses</option>
            <option value="2">Doesn't pulse</option>
          </Form.Select>
        </InputGroup>
      </Form>
    );
  };
}

ItemForm.propTypes = {
  children: PropTypes.any,
  item: PropTypes.object,
  tag: PropTypes.string,
  user: PropTypes.any,
  updateItem: PropTypes.func,
};

const UPDATE_PATHS = ["item.tag"];
const derive = (props) => ({
  tag: revertEscapeHtml(get(props, "item.tag", "")),
});

const mapStateToProps = ({ user }, ownProps) => ({
  ...ownProps,
  user,
});

export default compose(
  connect(mapStateToProps),
  deriveProps(derive, UPDATE_PATHS, "tag")
)(ItemForm);
