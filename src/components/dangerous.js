import React from "react";
import PropTypes from "prop-types";

export const DangerousSpan = ({ children, ...rest }) => (
  <span {...rest} dangerouslySetInnerHTML={{ __html: children }} />
);

DangerousSpan.propTypes = {
  children: PropTypes.string,
};

DangerousSpan.defaultProps = { children: "" };
