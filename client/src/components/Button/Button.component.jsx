import React from 'react';
import './Button.styles.css';
const Button = ({ children, className, ...otherProps }) => (
  <button className={`submit-button ${className}`} {...otherProps}>
    {children}
  </button>
);

export default Button;
