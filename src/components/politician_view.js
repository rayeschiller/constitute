import React, { Component } from 'react';
import * as d3 from "d3";
import marker from './images/marker.png'
import './styles/w3-styles.css'
import AOC from './images/AOC.jpg'
import Pressley from './images/AyannaPressley.jpg'
import Haaland from './images/DebHaaland.jpg'
import Harris from './images/KamalaHarris.jpg'
import Gillibrand from './images/KirstenGillibrand.jpg'
import Collins from './images/SusanCollins.jpg'
import Warren from './images/ElizabethWarren.jpg'

import GoogleMapReact from 'google-map-react';

const pk = () => {
    let path = window.location.pathname
    return path = path.replace('/', '');
}

const hostname = () => window.location.hostname === "localhost" ?  "http://localhost:8000" : "https://constitute.herokuapp.com"

let count = 0

class PoliticianDetails extends Component {
    constructor(props) {
        super(props)
        this.test = this.props.pk
        this.hostname = hostname()

        this.state = {
            neutralData: null,
            negData: null,
            posData: null, 
          };

        this.pk = pk()
    
    }

    componentDidMount() {

        console.log(this.hostname + '/tweets/?sentiment__lt=0&politician__id=' + this.pk + '&format=json')
        fetch(this.hostname + '/tweets/?sentiment=0&politician__id=' + this.pk + '&format=json')
        .then(response => response.json())
        .then(neutralData => this.setState({ neutralData: neutralData.count }));
        fetch(this.hostname  + '/tweets/?sentiment__lt=0&politician__id=' + this.pk + '&format=json')
        .then(response => response.json())
        .then(negData => this.setState({ negData: negData.count }));
        fetch(this.hostname  + '/tweets/?sentiment__gt=0&politician__id=' + this.pk + '&format=json')
        .then(response => response.json())
        .then(posData => {this.setState({ posData: posData.count })})
        
        this.politicianTweetDetails()
     }
     componentDidUpdate() {
        this.politicianTweetDetails()
     }


    politicianTweetDetails () {
        var data = [];
        data.push(
        {   'tweetType': 'negative',
            'count': this.state.negData},
        {   'tweetType': 'positive',
            'count': this.state.posData}, 
        {   'tweetType': 'neutral',
            'count': this.state.neutralData})
        count ++ 

        if (count === 4) {

            var width = 300,
                height = 300,
                radius = Math.min(width, height) / 2;
            
            var color = d3.scaleOrdinal()
                .range([ "#cc2816", "#075d9a", "#68605f"]);
            
            var div = d3.select("body").append("div")	
                    .attr("className", "tooltip")				
                    .style("opacity", 0);

            var pie = d3.pie()
                .value(function(d) { return d.count; })(data);
                
            var arc = d3.arc()
                    .outerRadius(height/2)
                    .innerRadius(height/4)
                    .padAngle(0.03)
                    .cornerRadius(1)
            
            var labelArc = d3.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40);
        
            var svg = d3.select("#pie")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width/2 + "," + height/2 +")"); // Moving the center point. 1/2 the width and 1/2 the height    

            var g = svg.selectAll("arc")
                .data(pie)
                .enter().append("g")
                .attr("className", "arc");
            
            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color(d.data.tweetType);})
                .on("mouseover", function(d) { 
                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9);		
                    div.html(d.data.count + " tweets")
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px");	
                    })					
                .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
            
            g.append("text")
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                    //we have to make sure to set these before calling arc.centroid
                    d.innerRadius = 0;
                    d.outerRadius = radius;
                    return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
                })
            .attr("dy", ".50em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.tweetType;
            });
        }
    }


    render () {
        return <svg ref={node => this.node = node}
        width={200} height={100}>
        </svg>
    }
}

const AnyReactComponent = ({text}) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 39,
      lng: -95
    },
    pin1: {
        lat:39,
        lng:-95
    },
    zoom: 4
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '75vh', width: '75%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBiWXWkBEsSpN4viAXNSEDyFlKHOJ8SGu4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={38}
            lng={-90}
            text="My Marker"
          />
            <AnyReactComponent
            lat={40}
            lng={-80}
            text="My Marker"
          />
            <AnyReactComponent
            lat={38}
            lng={-90}
            text="My Marker"
          />
            <AnyReactComponent
            lat={30}
            lng={-100}
            text="My Marker"
          />
            <AnyReactComponent
            lat={41}
            lng={71}
            text="My Marker"
          />
            <AnyReactComponent
            lat={50}
            lng={-90}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

class PageLayout extends Component {
    constructor(props) {
        super(props)

        this.hostname = hostname()

        this.state = {
            pk: null,
            firstName: null,
            lastName: null,
            altName: null,
            username: null,
            office: null,
            district: null,
        }

    }


    componentDidMount() {

        const { politicianId } = this.props.match.params;
        fetch(this.hostname + `/politicians/?id=${politicianId}&format=json`)
          .then( response => response.json())
          .then(politicianId => {
              this.setState({pk : politicianId.results[0].pk, firstName:politicianId.results[0].first_name, lastName: politicianId.results[0].last_name, altName: politicianId.results[0].alternativeName, username: politicianId.results[0].username, office: politicianId.results[0].office_level, district: politicianId.results[0].district })
            }
              );
          
      }
      
    render(){
        let style1 = {
            maxWidth: '1400px',
            marginTop:'100px'
        }

        let imgStyle = {
            height: '100%',
            width: '100%'
        }

        const lastName = this.state.lastName
        let img
        
        if (lastName === 'Collins') {
            img = <img src={Collins}  style={imgStyle} alt="Avatar"></img>

        }
        if (lastName === 'Pressley') {
            img = <img src={Pressley}  style={imgStyle} alt="Avatar"></img>

        }
        if (lastName === 'Gillibrand') {
            img = <img src={Gillibrand}  style={imgStyle} alt="Avatar"></img>

        }
        if (lastName === 'Haaland') {
            img = <img src={Haaland}  style={imgStyle} alt="Avatar"></img>

        }
        if (lastName === 'Harris') {
            img = <img src={Harris}  style={imgStyle} alt="Avatar"></img>

        }
        if (lastName === 'Warren') {
            img = <img src={Warren}   style={imgStyle} alt="Avatar"></img>

        }
        if (lastName === 'Ocasio-Cortez') {
            img = <img src={AOC}  style={imgStyle} alt="Avatar"></img>

        }
       return(
        <body className="w3-light-grey">
            <div className="w3-content" style={style1}>
                <div className="w3-row-padding">
                    <div className="w3-third">
                        <div className="w3-white w3-text-grey w3-card-4">
                            <div className="w3-display-container">
                                <person lastName={lastName}/>
                                {img}
                                <div className="w3-display-bottomleft w3-container w3-text-black w3-white">
                                <h2>{this.state.firstName}{this.state.lastName}</h2>
                                </div>
                            </div>
                            <div className="w3-container">
                                <p>{this.state.office}</p>
                                <p>{this.state.district}</p>
                                <p><a href={'https://twitter.com/'+ this.state.username}>@{this.state.username}</a></p>
                                {/* {% if politician.alternativeName %}<p><i className="fa fa-twitter fa-fw w3-margin-right w3-large w3-text-teal"></i><a href="https://twitter.com/{{politician.alternativeName}}">@{{politician.alternativeName}}</a></p>{% endif %} */}
                                <hr></hr>
                            </div>
                        </div><br></br>
                    </div>
                    <div className="w3-twothird">
    
                        <div className="w3-container w3-card w3-white w3-margin-bottom">
                            <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Sentiment Levels</h2>
                            <div className="w3-container">
                            <div  id="pie"><PoliticianDetails/></div>
                            <hr></hr>
                            </div>
                        </div>
                        <div className="w3-container w3-card w3-white">
                            <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Tweet Map</h2>
                            <div className="w3-container">
                                    <div id = "map-container" ><SimpleMap></SimpleMap><br></br><br></br></div>
                                <hr></hr>
                            
                            </div>
                        </div>
                    </div>          
                </div> 
            </div>
        </body>
  
        );
    }
}
export { PageLayout, PoliticianDetails };
 

