import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = (props) => {
  return <Alert variant={props.variant}>{props.children}</Alert>;
};

export default ErrorMessage;
