import React, { Component } from 'react'
import './App.css'
import {Tweet} from 'react-twitter-widgets';

const Tweet1 = (props) => {
  return (

    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.username}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p className="card-text">{props.text}</p>
        <a href="#" className="card-link">Card link</a>
        <a href="#" className="card-link">Another link</a>
      </div>
    </div>
  );
};
const TweetList = (props) => {
  return (
    <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweetId} {...tweet}/>)}
    </div>
  );
}

class App extends Component {
  state = {
    tweets: [
    { tweetId: "511181794914627584"},
    { tweetId: "511181744914727584"},
]};
  constructor() {
    super()
    console.log("*****");
    console.log("inside App constructor");
    console.log("*****");
  }

  
  render () {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#">Political Sexism on Twitter</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
              <a className="nav-item nav-link" href="#">By State</a>
            </div>
          </div>
        </nav>
        <div className="container-fluid text-center">    
          <div className="row content">
            <div className="col-sm-2 sidenav">
            </div>
            <div className="col-sm-8 text-left"> 
              <h1>Tweets</h1>
              <TweetList tweets={this.state.tweets} />
            </div>
            <div className="col-sm-2 sidenav">
            </div>
          </div>
        </div>
        </div>
      
    )
  }
}
export default App
