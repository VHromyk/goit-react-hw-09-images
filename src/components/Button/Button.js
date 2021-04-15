import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <>
      <button className="Button" onClick={onClick}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
