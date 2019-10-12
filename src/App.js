import React, { Component } from 'react'
import './App.css'
import {Tweet} from 'react-twitter-widgets';
import logoFinal from './components/images/constitute.png';
import Tweets from './components/Tweets';
import Home from './components/Home';
import Analytics from './components/Analytics';
import About from './components/About';
import Map from './components/Map';
import Cloud from './components/politician_count_cloud'
import {PageLayout} from './components/politician_view'

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
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <a className="navbar-brand pull-left" href="/home">
          <div>
          <img src={logoFinal} className="logoStyle" width='115'   margintop='-100'/></div></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/home">Constitute</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="/appTweets">Tweets <span className="sr-only">(current)</span></a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/vis">Analytics <span className="sr-only">(current)</span></a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/analytics">Analytics <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About <span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

       <div className="App-intro">
        <Switch>
          <Route path="/analytics" render={(props)=> <Cloud></Cloud>} />
          <Route path="/appTweets" render={(props) => <Tweets {...props} tweets="home" />} />
          <Route path="/genderTweets" render={(props) => <Tweets {...props} tweets="home" />} />
          {/* <Route path="/analytics" component={Analytics} /> */}
          <Route path="/about" component={About} />
          <Route path="/politician/:politicianId" component={PageLayout}/>
          <Route path='/vis' component={() => { 
            var hostname = "";
            if (window.location.hostname === "localhost"){
              hostname = "http://localhost:8000";
            } else {
              hostname = "https://constitute.herokuapp.com"
            }
            window.location = hostname + '/data_viz/'; return null;} }/>
          <Route path="/*" component={Home}/>
        </Switch>
        </div>


       
        </div>
      
    )
  }
}
export default App
