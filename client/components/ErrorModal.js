import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorModal = (props) => {
  return (
    <>
      <Alert variant={props.variant}>{props.error}</Alert>
    </>
  );
};

export default ErrorModal;
