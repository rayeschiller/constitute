import React, { Component } from 'react'
import {Tweet} from 'react-twitter-widgets';

const TweetList = (props) => {
    console.log('tweet list props');
    console.log(props)
    return (
      <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
      </div>
  
    ); 
  }
  
  
  class Tweets extends Component {
    
    constructor(props) {
      super(props)
      console.log("tweet props");
      console.log(props);
      this.handleClick=this.handleClick.bind(this);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        tweets: [],
        selectedPolitician: null,
      }
    }
  
    handleClick(e) {
      console.log('clicked aoc ');
      console.log(e);
    }
  
  
  
    componentDidMount() {
      console.log("fetching the hostname");
      // fetch(HOST_NAME + TWEET_ENDPOINT) 
      var hostname = "";
      if (window.location.hostname === "localhost"){
        hostname = "http://localhost:8000";
      } else {
        hostname = "https://pst-360.herokuapp.com"
      }
      console.log(hostname);
      fetch(hostname + "/tweets/?format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            tweets: result.results.map(function(tweet){
              return {"tweetId": tweet.tweet_id};
            })
          });
          console.log("got result!");
          console.log(result);
        }
      )  
    }
  
    render() {
      return (
        <div className="container-fluid text-center">
          <div className="row content">  
          </div>
            <div className="col-sm-8 text-left"> 
              <TweetList tweets={this.state.tweets} />
            </div>
            <div className="col-sm-2 sidenav">
            </div>
        </div>
     
      )
    }
  }
  export default GenderComparison