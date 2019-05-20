import React, { Component } from 'react';
import rina from './images/rina.jpg';
import jules from './images/jules.jpg';
import nat from './images/nat.jpg';
import $ from 'jquery';

class About extends Component {

    componentDidMount () {
        $(document).ready(function(){
          $('.header').height($(window).height());
         })
      }


    render() {
        return (
            <div className="container-fluid">
                <div className="team">
                    <h1 className="text-center">Our Team</h1>
                <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 item">
                <div className='circular'>
                    <img src={nat} className="img-fluid" alt="team"/>
                    </div>
                    <div className="des">
                    Natalie
                    </div>
                    <div className="text-muted">Natalie is a full stack software engineer at JP Morgan in Asset and Wealth Management. She graduated from Colby College in Maine with a major in mathematics. Her interests include politics, coding and mathematics.</div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 item">
                <div className='circular'>
                    <img src={rina} className="img-fluid" alt="team"/>
                    </div>
                    <div className="des">
                    Rina
                    </div>
                    <div className="text-muted">Rina is a software engineer at JPMorgan Chase. She graduated from Hunter college in NYC with a major in digital media and minors in computer science and gender studies. She is very passionate about politics, gender equality, technology, and short hair.</div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 item">
                <div className='circular'>
                    <img src={jules} className="img-fluid" alt="team"/>
                    </div>
                    <div className="des">
                    Jules
                    </div>
                    <div className="text-muted">Jules is a developer a JP Morgan. She graduated from Baruch College with a degree in Information Systems, English, NYC Studies, and International Relations. She is passionate about creating inclusive spaces to discuss gender inequities.</div>
                </div>
                </div>
                </div>
            </div>

        )
}
}

export default About;