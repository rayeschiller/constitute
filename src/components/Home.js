import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './styles.css'
import $ from 'jquery'
import logoFinal from './../logoFinal.png'
import aboutImg from './about-img.jpg'

class Home extends Component {
  
  componentDidMount () {
    $(document).ready(function(){
      $('.header').height($(window).height());
      $('.team').height($(window).height());
     })
  }

  render (){
  return(
  <div>
      <Helmet bodyAttributes={{style: 'background-color : #b3cccc'}}/>
      <header className="header">
        <div className="overlay"></div>
      </header>
      <div className="container">
        <div className="description ">
          <h1>POLITICAL SEXISM ON TWITTER
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
     
    <h3>Political Sexism on Twitter (PST)
      <img src={logoFinal}/>
    </h3>
    <p>
       ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
     tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
     quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
     consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
     cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
     proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
   </div>
  </div>
  </div>

<div className="team">

 <div className="container-team"></div>
    <h1 className="text-center">Our Team</h1>
  <div className="row">
   <div className="col-lg-4 col-md-4 col-sm-12 item">
    <img src="images/team-2.jpg" className="img-fluid" alt="team"/>
    <div className="des">
      Sara
     </div>
    <span className="text-muted">Manager</span>
   </div>
   <div className="col-lg-4 col-md-4 col-sm-12 item">
    <img src="images/team-3.jpg" className="img-fluid" alt="team"/>
    <div className="des">
       Chris
     </div>
    <span className="text-muted">S.enginner</span>
   </div>
   <div className="col-lg-4 col-md-4 col-sm-12 item">
    <img src="images/team-2.jpg" className="img-fluid" alt="team"/>
    <div className="des">
      Layla 
     </div>
    <span className="text-muted">Front End Developer</span>
   </div>
  </div>
</div>


</div>
    )
  }
}


export default Home;