import React from 'react';
import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ img, alt, onClick }) => (
  <li onClick={onClick} className="ImageGalleryItem">
    <img src={img} alt={alt} className="ImageGalleryItem-image" />
  </li>
);

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
