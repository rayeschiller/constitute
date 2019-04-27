import React, { Component } from 'react';
import * as d3 from "d3";
import $ from 'jquery'

class PoliticianDetails extends Component {
    // constructor() {
    //     super()
    // }

    componentDidMount() {
        this.politicianTweetDetails()
     }
     componentDidUpdate() {
        this.politicianTweetDetails()
     }


    politicianTweetDetails () {
        var data = [];
        data.push(
        {   'tweetType': 'negative',
            'count': '{{negativeTweets}}'},
        {   'tweetType': 'positive',
            'count': '{{positiveTweets}}'}, 
        {   'tweetType': 'neutral',
            'count': '{{neutralTweets}}'})
        
        console.log(data);
        var width = 300,
            height = 300,
            radius = Math.min(width, height) / 2;
        
        var color = d3.scaleOrdinal()
            .range([ "#cc2816", "#075d9a", "#68605f"]);
        
        var div = d3.select("body").append("div")	
                .attr("class", "tooltip")				
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
            .attr("class", "arc");
        
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

    render () {
        return <svg ref={node => this.node = node}
        width={500} height={500}>
        </svg>
    }
}

export default PoliticianDetails