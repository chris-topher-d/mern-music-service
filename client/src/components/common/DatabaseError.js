import React from 'react';
import { Link } from 'react-router-dom';

const DatabaseError = () => {
  return (
    <div className='error-container'>
      <div className='error'>
        <h1>Oops!</h1>
        <h1>Server not responding. Please try again.</h1>
        <Link to='/'>
          <button>Reload</button>
        </Link>
      </div>
    </div>
  );
}

export default DatabaseError;
