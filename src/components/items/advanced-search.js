import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

import * as ItemSearchActions from "../../actions/item-search";
import Materials from "../../constants/materials";
import throttle from "lodash/throttle";

class AdvancedSearch extends Component {
  state = {
    keywords: [...this.props.keywords],
    exclusions: [...this.props.exclusions],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.keywords !== this.props.keywords) {
      this.setState({
        keywords: [...nextProps.keywords],
      });
    }
  }

  addKeyword = () => {
    this.setStateKeywords([...this.props.keywords, ""]);
  };

  removeKeyword = () => {
    const keywords = [...this.props.keywords];
    keywords.pop();

    this.setStateKeywords(keywords);
  };

  updateKeywords = ({ target }) => {
    const index = parseInt(target.getAttribute("data-keyword-index"), 10);
    const keyword = target.value;
    const keywords = [...this.props.keywords];
    keywords.splice(index, 1, keyword);

    this.setStateKeywords(keywords);
  };

  addExclusion = () => {
    this.setStateExclusions([...this.state.exclusions, ""]);
  };

  removeExclusion = () => {
    this.setStateExclusions(
      this.state.exclusions.slice(0, this.state.exclusions.length - 1)
    );
  };

  updateExclusions = ({ target }) => {
    const index = parseInt(target.getAttribute("data-exclusion-index"), 10);
    console.log("updateExclusions index", index);
    const exclusion = target.value;
    const exclusions = [...this.state.exclusions];
    exclusions.splice(index, 1, exclusion);

    this.setStateExclusions(exclusions);
  };

  setStateExclusions = (exclusions) => {
    this.setState({ exclusions }, this.setStoreExclusions);
  };

  setStoreExclusions = throttle(() => {
    this.props.setExclusions(this.state.exclusions);
  }, 1000);

  setStateKeywords = (keywords) => {
    this.setState({ keywords }, this.setStoreKeywords);
  };

  setStoreKeywords = throttle(() => {
    this.props.setKeywords(this.state.keywords);
  }, 1000);

  updateKeywordsSearchType = ({ target: { value } }) => {
    this.props.setKeywordsSearchType(value);
  };

  updatePulsing = ({ target: { value } }) => {
    this.props.setPulsing(value);
  };

  updateMaterial = ({ target: { value } }) => {
    this.props.setMaterial(value);
  };

  render = () => (
    <>
      <ListGroup className="mb-2">
        <ListGroup.Item>
          <Button
            variant="outline-secondary"
            onClick={this.props.toggleAdvancedSearch}
          >
            Simple Search
          </Button>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup className="mb-2">
        <ListGroup.Item>
          {this.state.keywords.map((keyword, index) => (
            <Form.Control
              key={index}
              className="mt-2"
              data-keyword-index={index}
              onChange={this.updateKeywords}
              value={keyword}
            />
          ))}
          <Form.Select
            value={this.props.keywordsSearchType}
            onChange={this.updateKeywordsSearchType}
            className="mt-2"
          >
            <option value="all">Must have ALL Keywords</option>
            <option value="any">May contain any Keyword</option>
          </Form.Select>
          <Button
            variant="danger"
            className="my-2 me-2"
            onClick={this.removeKeyword}
          >
            Remove Keyword
          </Button>
          <Button onClick={this.addKeyword}>Add Keyword</Button>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup className="mb-2">
        <ListGroup.Item>
          <Form.Label>Do not include any of these:</Form.Label>
          <br />
          {this.state.exclusions.map((exclusion, index) => (
            <Form.Control
              key={index}
              className="mt-2"
              value={exclusion}
              data-exclusion-index={index}
              onChange={this.updateExclusions}
            />
          ))}
          <Button
            variant="danger"
            className="my-2 me-2"
            onClick={this.removeExclusion}
          >
            Remove Exclusion
          </Button>
          <Button onClick={this.addExclusion}>Add Exclusion</Button>
        </ListGroup.Item>
      </ListGroup>
      <ListGroup>
        <ListGroup.Item>
          <InputGroup>
            <InputGroup.Text>Include Pulsing Items</InputGroup.Text>
            <Form.Select
              value={this.props.pulsing}
              onChange={this.updatePulsing}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Filter by material</InputGroup.Text>
            <Form.Select
              value={this.props.material}
              onChange={this.updateMaterial}
            >
              <option value="any" className="value">
                Any material
              </option>
              {Materials.map((material, index) => (
                <option key={material} value={index}>
                  {material}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Filter by weight</InputGroup.Text>
            <Form.Select
              value={this.props.weightType}
              onChange={(e) => this.props.setWeightType(e.target.value)}
            >
              <option value="<">Must be less than</option>
              <option value=">">Must be greater than</option>
            </Form.Select>
            <Form.Control
              type="number"
              value={this.props.weight}
              onChange={(e) => this.props.setWeight(e.target.value)}
            />
          </InputGroup>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

AdvancedSearch.propTypes = {
  keywords: PropTypes.array,
  keywordsSearchType: PropTypes.string,
  exclusions: PropTypes.array,
  setKeywordsSearchType: PropTypes.func,
  setKeywords: PropTypes.func,
  setExclusions: PropTypes.func,
  setWeight: PropTypes.func,
  setWeightType: PropTypes.func,
  toggleAdvancedSearch: PropTypes.func,
};

AdvancedSearch.defaultProps = {
  keywords: [""],
  keywordsSearchType: "any",
  exclusions: [],
  pulsing: "yes",
  material: "any",
  weight: "",
  weightType: "<",
};

const mapStateToProps = ({ item_search }) => item_search;

export default connect(mapStateToProps, ItemSearchActions)(AdvancedSearch);
