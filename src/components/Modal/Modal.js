import React, { useEffect } from 'react';
import './Modal.scss';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = event => {
    if ((event.code = 'Escape')) {
      onClose();
    }
  };

  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">{children}</div>
    </div>
  );
}
