import React, { Component } from 'react';
import {Tweet} from 'react-twitter-widgets';


const TweetList = (props) => {
    console.log('tweet list props');
    console.log(props)
    return (
      <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
      </div>
  
    ); 
  }

class Analytics extends Component {

    constructor(props) {
        super(props)
        console.log("tweet props");
        console.log(props);
        
        var hostname = "";
        if (window.location.hostname === "localhost"){
          hostname = "http://localhost:8000";
        } else {
          hostname = "https://pst-360.herokuapp.com"
        }
    
    
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          tweets: [],
        };
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
        fetch(hostname + "/tweets/?sort=sentiment&format=json")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result,
              tweets: result.results.map(function(tweet){
                  console.log(tweet.sentiment);
                return {"tweetId": tweet.tweet_id};
              })
            });
            console.log("got result!");
            console.log(result);
          }
        )  
      }


    render() {
        const { error, isLoaded} = this.state;
  if (error){
    return <div> Error: {error.message}</div>
  } else if (!isLoaded){
    return <div>Loading...</div>
  } else{
        return (
            <div className="jumbotron">
            <div className="container">
            <center><h1></h1>
            <TweetList tweets={this.state.tweets} />
            </center>
            </div>
        </div>
        )
    }
}
}
export default Analytics