import React from 'react';
import './pill.styles.css';

const Pill = ({ children, color }) => (
  <div className={`pill`} style={color ? { backgroundColor: color } : null}>
    {children}
  </div>
);

export default Pill;
