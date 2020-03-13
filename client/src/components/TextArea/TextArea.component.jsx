import React from 'react';
import './textarea.styles.css';

const TextArea = ({ handleChange, label, value, ...otherProps }) => (
  <div className='text-area-input'>
    <textarea onChange={handleChange} {...otherProps} className='comp-textarea'>
      {value}
    </textarea>
    <p>{label}</p>
  </div>
);

export default TextArea;
