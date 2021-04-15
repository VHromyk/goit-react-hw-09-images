import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className="Overlay" onClick={this.handleBackdrop}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
