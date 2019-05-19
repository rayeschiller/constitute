import React, { Component } from 'react';
import aboutImg from './images/about-img.jpg';
import constitute from './images/constitute.png';
import pstImg from './images/pst-home-image.jpeg';
import $ from 'jquery';
import Helmet from 'react-helmet';
import Carousel from 'react-bootstrap/Carousel';
import Chart from './Chart';




class Home extends Component {
    componentDidMount () {
        console.log('inside home component');
        $(document).ready(function(){
          $('.header').height($(window).height());
         })
      }


    render (){
        return(

            <React.Fragment>

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={constitute}
      alt="First slide"
    />
    <Carousel.Caption>
      {/* <h3>A gender driven analytics tool</h3> */}
      {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
  <Chart></Chart>
    {/* <img
      className="d-block w-100"
      src={aboutImg}
    //   "?text=Second slide&bg=282c34"
      alt="Third slide"
    /> */}

    <Carousel.Caption>
      {/* <h3>Second slide label</h3> */}
      {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={pstImg}
      alt="Third slide"
    />

    <Carousel.Caption>
      {/* <h3>Third slide label</h3> */}
      {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<div className="container-fluid">
    <h2>HERE </h2>
</div>

</React.Fragment>

        );
    }

}
export default Home;