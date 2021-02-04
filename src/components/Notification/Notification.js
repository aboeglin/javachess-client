import React from "react";
import PropTypes from "prop-types";

const Notification = ({ show, children }) => {
  if (show) {
    return <div>{children}</div>;
  }

  return null;
};

Notification.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
};

Notification.defaultProps = {
  show: false,
};

export default Notification;
