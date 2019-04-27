import React, { Component } from 'react';
import * as d3 from "d3";
import $ from 'jquery'
import PoliticianDetails from './politician_view'
import { Redirect } from 'react-router'

import {
    Route,
    Switch,
    BrowserRouter,
  } from 'react-router-dom';

const hostname = () => window.location.hostname === "localhost" ?  "http://localhost:8000" : "https://pst-360.herokuapp.com"

class Cloud extends Component {
    constructor(props) {
        super(props)
        this.hostname = hostname()
    }

    componentDidMount() {
        this.politicianBubbles(this.hostname)
     }
     componentDidUpdate() {
        this.politicianBubbles(this.hostname)
     }

    politicianBubbles (hostname) {
        $.getJSON(hostname + '/politicians/?format=json', function(politicians_data) {
            $.getJSON(hostname + '/tweets/?format=json', function(tweet_data) {    
                console.log(hostname)            
                const width = 1000 //max size of the bubbles
                const height =800
                // const color = d3.scaleOrdinal(d3.schemeAccent);
                const scale = d3.scaleLinear()
                    .domain([100, 3000])
                    .range([50, 300]);
                const color = d3.scaleLinear()
                    .domain([0,5]) //map colors based on value
                    .range(['green', '#47DFFF']); //color category
                const politiciansData = {};
                politiciansData['children'] = politicians_data.results;
               
                const bubble = d3.pack(politiciansData)
                    .size([width, height])
                    .padding(1.5);
            
                const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "bubble");
                
                    // Define the div for the tooltip
                const div = d3.select("body").append("div")	
                    .attr("class", "tooltip")				
                    .style("opacity", 0);
                
                    const nodes = d3.hierarchy(politiciansData)
                    .sum(function(d) { 
                        return scale(d.tweet_count); 
                    });

                const node = svg.selectAll(".bubble")
                    .data(bubble(nodes).descendants())
                    .enter()
                    .append("g")
                    .filter(function(d){
                        return !d.children
                    })
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                
                node.append("title")
                    .text(function(d) { return d.data.pk; });
                    
                node.append("circle")
                    .attr("r", function(d) { return d.r; })
                    .style("fill", function(d,i) {
                        return color(i);
                    })
                    .on("mouseover", function(d){ 
                        console.log(d.data)
                        div.transition()		
                            .duration(200)		
                            .style("opacity", .9);		
                        div.html(d.data.first_name + " " + d.data.last_name 
                            + "<br/>"  + d.data.tweet_count + " tweets"
                            + "<br/>" + d.data.political_party
                            + "<br/>"  + d.data.office_level
                            )
                            
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 28) + "px");	
                        })					
                    .on("mouseout", function(d) {		
                        div.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                    })
                    .on("dblclick", function(d){
                        // var test = "http://localhost:3000/"
                        //  return <BrowserRouter>
                        //      <Route path="/politiciansDetails" Component={PoliticianDetails} />
                        //      </BrowserRouter>
                    //     // return window.location.assign(test + PoliticianDetails + d.data.pk, '_blank');
                    //    return <Redirect to="/politiciansDetails" />
                    })
                
                
                node.append("text")
                    .attr("dy", ".2em")
                    .style("text-anchor", "middle")
                    .text(function(d) {
                        return d.data.last_name.substring(0, d.r / 3);
                    })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", function(d){
                        return d.r/5;
                    })
                    .attr("fill", "black");

                node.append("text")
                    .attr("dy", "1.3em")
                    .style("text-anchor", "middle")
                    .text(function(d) {
                        return d.data.tweet_count;
                    })
                    .attr("font-family",  "Gill Sans", "Gill Sans MT")
                    .attr("font-size", function(d){
                        return d.r/5;
                    })
                    .attr("fill", "black");
            }); 
        });
    }

    render() {
        // return <svg ref={node => this.node = node}
        // width={500} height={500}>
        // </svg>
        return <div>HELOWWWW</div>
     }
  }

  export default Cloud
