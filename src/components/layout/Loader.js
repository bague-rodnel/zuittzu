import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ message }) => {
  return (
    // <div className="loader"></div>
    <div className="w-100 my-5 flex justify-content-center align-items-center">
      <Spinner animation="border" size="sm" className="mr-3" />
         { message ? message : `Loading...` }
    </div>
  )
}

export default Loader
