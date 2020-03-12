import React from 'react';
import './FormInput.styles.css';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='input'>
    <input onChange={handleChange} {...otherProps} />
    <p>{label}</p>
  </div>
);

export default FormInput;
