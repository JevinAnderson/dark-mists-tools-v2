import React from "react";
import PropTypes from "prop-types";

export const DangerousSpan = ({ children = "", style = {}, ...rest }) => (
  <span
    {...rest}
    style={{ whiteSpace: "pre-line", ...style }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

DangerousSpan.propTypes = {
  children: PropTypes.string,
};

