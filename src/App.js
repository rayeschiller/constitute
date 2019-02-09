import React, { Component } from 'react'
import './App.css'
import {Tweet} from 'react-twitter-widgets';
import logoFinal from './logoFinal.png';
import Tweets from './components/Tweets';
import Home from './components/Home';
import Analytics from './components/Analytics';
import Map from './components/Map';

import Helmet from 'react-helmet';


import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

const TweetList = (props) => {
  console.log('tweet list props');
  console.log(props);
  return (
    <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
    </div>

  ); 
}


class App extends Component {

  render () {
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
              <a className="nav-item nav-link" href="/appTweets">Tweets</a>
              <a className="nav-item nav-link" href="/analytics">Analytics</a>
              <a className="nav-item nav-link" href="/vis">Top Words</a>
              {/* <a className="nav-item nav-link" href="/maps">Maps</a> */}
              <a className="nav-item nav-link" href="/politicians">Politician Breakdown</a>
            </div>
          </div>
          </div>
        </nav>

       <div className="App-intro">
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/appTweets" render={(props) => <Tweets {...props} tweets="home" />} />
          <Route path="/genderTweets" render={(props) => <Tweets {...props} tweets="home" />} />
          <Route path="/analytics" component={Analytics} />
          <Route path='/vis' component={() => { window.location = 'http://localhost:8080/'; return null;} }/>
          {/* <Route path="/maps" component={Map}/> */}
          <Route path='/politicians' component={() => { window.location = 'http://pst-360.herokuapp.com/data_viz/'; return null;} }/>
        </Switch>
        </div>


       
        </div>
      
    )
  }
}
export default App
