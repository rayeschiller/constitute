import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './styles.css'
import $ from 'jquery'
import logoFinal from './images/logoFinal.png'
import aboutImg from './images/about-img.jpg'
import rina from './images/rina.jpg'
import jules from './images/jules.jpg'
import nat from './images/nat.jpg'
import Chart from './Chart'

class Home extends Component {
  
  componentDidMount () {
    $(document).ready(function(){
      $('.header').height($(window).height());
     })
  }

  render (){
  return(
  <div>
      <Helmet bodyAttributes={{style: 'background-color : white'}}/>
      <header className="header">
        <div className="overlay"></div>
      </header>
      <div className="container">
        <div className="description ">
          <h1>Constitute
          <p>    
          A gender driven political analytics design to shed light on online harassment and inequalities women and LQBTQ folx encounter when running for office.
          </p>   
        </h1>  
      </div>
    </div>
    <div className="about">
    <h1>Who We Are</h1>
    <div className="row">
      <div className="col-lg-4 col-md-4 col-sm-12">
        <img src={aboutImg} className="img-fluid"/>
        <span className="text-justify">Represention is power</span>
      </div>
   <div className="col-lg-8 col-md-8 col-sm-12 desc">
     
    <h3>Constitute
      <img src={logoFinal}/>
    </h3>
    <p>

The goal of Constitute is to raise awareness of online rhetoric towards female politicians and how that feeds into public perception during election cycles and effects outcomes.
We want to: Use sexist words along with most prominent female politicians of the 2020 election cycle to create mappings and visualizations of the the candidates receiving the most online negatively as well as the words being and imagery being used to describe them. Compare against their male counterparts, and raise public awareness. 
    </p>
   </div>
  </div>
  </div>

  <div>
  <Chart></Chart>
</div>

</div>
    )
  }
}


export default Home;