import React from 'react';
import Helmet from 'react-helmet';
import './styles.css'

const Home = () => (
  <div>
      <Helmet bodyAttributes={{style: 'background-color : #b3cccc'}}/>
      <h1 className='homeHeader'>HOME</h1>
  </div>
);

export default Home;