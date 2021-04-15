import React from 'react';
import Loader from 'react-loader-spinner';
import './Spiner.scss';

const Spiner = () => (
  <div className="Spiner">
    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
  </div>
);

export default Spiner;
