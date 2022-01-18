import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = (props) => {
  let { href, styles, children, to, exact, type, onClick, disabled } = props;

  if (href) {
    // standard anchor tag
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }
  if (to) {
    // React Link
    return (
      <Link
        to={to}
        exact={exact}
        onClick={onClick}
        className={`${styles} 
        inline-block rounded-full`}
        disabled={disabled}
      >
        {children}
      </Link>
    );
  }
  return (
    // regular button
    <button
      className={`${styles} ${
        props.auth && 'button_auth'
      } inline-block rounded-full`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
