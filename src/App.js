import React, { Component } from 'react'
import './App.css'
import {Tweet} from 'react-twitter-widgets';
import logoFinal from './logoFinal.png';
import Tweets from './components/Tweets';
import Home from './components/Home';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

const TweetList = (props) => {
  return (
    <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
    </div>

  ); 
}

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      tweets: [],
    };

    console.log("*****");
    console.log("inside App constructor");
    console.log("*****");
  }

  // componentDidMount(){
  //   // fetch(HOST_NAME + TWEET_ENDPOINT) 
  //   var hostname = "";
  //   if (window.location.hostname === "localhost"){
  //      hostname = "http://localhost:8000";
  //   } else {
  //     hostname = "https://pst-360.herokuapp.com"
  //   }
  //   fetch(hostname + "/tweets/?format=json")
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       this.setState({
  //         isLoaded: true,
  //         items: result,
  //         tweets: result.results.map(function(tweet){
  //           return {"tweetId": tweet.tweet_id};
  //         })
  //       });
  //       console.log(result);
  //     }
  //   )  
  // }

  render () {
    const { error, isLoaded} = this.state;
    if (error){
      return <div> Error: {error.message}</div>
    } else if (!isLoaded){
      return <div>Loading...</div>
    } else{
    return (
    
     <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand pull-left" href="/home">
          <div>
          <img src={logoFinal} width='100' margintop='-7' /></div></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="/home">Home<span className="sr-only">(current)</span></a>
              <a className="nav-item nav-link" href="/tweets">Tweets</a>
            </div>
          </div>
          </div>
        </nav>

       <div className="App-intro">
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/tweets" component={Tweets}/>
        </Switch>
        </div>


       
        </div>
      
    )
  }
}
}
export default App
