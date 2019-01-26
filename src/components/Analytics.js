import React, { Component } from 'react';
import { Tweet } from 'react-twitter-widgets';
import './styles.css'
import AOC from './AOC.jpg'
import Pressley from './images/AyannaPressley.jpg'
import Haaland from './images/DebHaaland.jpg'
import Harris from './images/KamalaHarris.jpg'
import Gillibrand from './images/KirstenGillibrand.jpg'
import Collins from './images/SusanCollins.jpg'
import Warren from './images/ElizabethWarren.jpg'

const TweetList = (props) => {
    console.log('tweet list props');
    console.log(props)
    return (
      <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
      </div>
  
    ); 
  }

class Analytics extends Component {

    handleClick(e) {
        const pk = e.target.getAttribute('value')
        console.log(pk);

        var hostname = "";
        if (window.location.hostname === "localhost"){
        hostname = "http://localhost:8000";
        } else {
        hostname = "https://pst-360.herokuapp.com"
        }


        console.log(hostname + `/tweets/?politician=${pk}&sort=-sentiment&format=json`);
        fetch(hostname + `/tweets/?politician=${pk}&ordering=-sentiment&format=json`)
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
        fetch(hostname + "/tweets/?ordering=-sentiment&format=json")
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
        const { error, isLoaded} = this.state;
  if (error){
    return <div> Error: {error.message}</div>
  } else if (!isLoaded){
    return <div>Loading...</div>
  } else{
        return (
            <div class="container-fluid">
                <div className="jumbotron">
                    <center><h1>Trending Sexist Tweets</h1>
                        <TweetList tweets={this.state.tweets} width="280" data-chrome="transparent noscrollbar" />
                    </center>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm col-auto">
                            <img value="1" src={AOC} className="img-fluid pics" 
                            onClick={this.handleClick.bind(this)}/>
                        </div>
                        <div className="col-sm col-auto">
                            <img value="2" src={Pressley} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                        <div className="col-sm col-auto">
                            <img value="4" src={Warren} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                    </div>
              
                    <div className="row">
                        <div className="col-sm col-auto">
                            <img value="8" src={Harris} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                        <div className="col-sm col-auto">
                            <img value="5" src={Gillibrand} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                        <div className="col-sm col-auto">
                            <img value="12" src={Collins} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                    </div>
            
            </div>


            </div>

       
        );
    }
}
}
export default Analytics