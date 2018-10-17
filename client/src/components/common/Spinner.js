import React from 'react';
import spinner from './spinner.gif';

const herokuLoad = (
  <div id='heroku-load' style={{textAlign: 'center'}}>
    <h1>Heroku is waking the app.</h1>
    <h1>This may take a few moments.</h1>
  </div>
);

const Spinner = ({currentlyLoaded}) => {
  if (currentlyLoaded === null) {
    return (
      <div className='spinner'>
        {herokuLoad}
        <img
          src={spinner}
          style={{width: '200px', display: 'block'}}
          alt='Loading...'
        />
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <img
          src={spinner}
          style={{width: '200px', margin: 'auto', display: 'block'}}
          alt='Loading...'
        />
      </div>
    );
  }
}

export default Spinner;
