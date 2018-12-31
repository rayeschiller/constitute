import React, { Component } from 'react'
import './App.css'
import {Tweet} from 'react-twitter-widgets';

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

  componentDidMount(){
    // fetch(HOST_NAME + TWEET_ENDPOINT) 
    fetch("http://localhost:8000/tweets/?format=json")
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
    const { error, isLoaded, items} = this.state;
    if (error){
      return <div> Error: {error.message}</div>
    } else if (!isLoaded){
      return <div>Loading...</div>
    } else{
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
              <h3>Tweets</h3>
              <TweetList tweets={this.state.tweets} />
              {/* <ul>
                {items.map(item => (
                  <li key={item.text}>
                    {item.tweet_id} 
                  </li>
                ))}
              </ul> */}
            </div>
            <div className="col-sm-2 sidenav">
            </div>
          </div>
        </div>
        </div>
      
    )
  }
}
}
export default App
