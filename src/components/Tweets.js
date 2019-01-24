import React, { Component } from 'react'
import {Tweet} from 'react-twitter-widgets';



const TweetList = (props) => {
  return (
    <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
    </div>

  ); 
}


class Tweets extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      tweets: [],
    };
  }

  componentDidMount() {
    // fetch(HOST_NAME + TWEET_ENDPOINT) 
    var hostname = "";
    if (window.location.hostname === "localhost"){
      hostname = "http://localhost:8000";
    } else {
      hostname = "https://pst-360.herokuapp.com"
    }
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
        console.log(result);
      }
    )  
  }

render () {
  const { error, isLoaded} = this.state;
  if (error){
    return <div> Error: {error.message}</div>
  } else if (!isLoaded){
    return <div>Loading...</div>
  } else{
  return (
  <div className="container-fluid text-center">
  
  <div className="row content">
    <div className="col-sm-2 sidenav">
    </div>
    <div className="col-sm-8 text-left"> 
      <TweetList tweets={this.state.tweets} />
    </div>
    <div className="col-sm-2 sidenav">
    </div>
  </div>
</div>
);

  }
}
}
export default Tweets