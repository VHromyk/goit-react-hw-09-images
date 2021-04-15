import React from 'react';
import './Container.scss';
import PropTypes from 'prop-types';

const Container = ({ children }) => <div className="Container">{children}</div>;

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
