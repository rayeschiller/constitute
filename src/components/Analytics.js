import React, { Component } from 'react';
import { Tweet } from 'react-twitter-widgets';
import './styles.css'
import AOC from './images/AOC.jpg'
import Pressley from './images/AyannaPressley.jpg'
import Haaland from './images/DebHaaland.jpg'
import Harris from './images/KamalaHarris.jpg'
import Gillibrand from './images/KirstenGillibrand.jpg'
import Collins from './images/SusanCollins.jpg'
import Warren from './images/ElizabethWarren.jpg'

const TweetList = (props) => {
    // console.log('tweet list props');
    // console.log(props)
    return (
      <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
      </div>
  
    ); 
  }


  const Images = (props) => {
      console.log(props.politician)
      return (
          <div></div>
      )
  }
    

//   const Politicians = props => props.politicians.map(politician => )

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
            // console.log("got result!");
            // console.log(result);
        }
        )  
    }

    constructor(props) {
        super(props)
        // console.log("tweet props");
        // console.log(props);
        
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
          itemsPoliticans: [],
          politicians: [] ,
        };
      }



    componentDidMount() {
        // console.log("fetching the hostname");
        // fetch(HOST_NAME + TWEET_ENDPOINT) 
        var hostname = "";
        if (window.location.hostname === "localhost"){
          hostname = "http://localhost:8000";
        } else {
          hostname = "https://pst-360.herokuapp.com"
        }
        // console.log(hostname);
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
          }
        ) 
        fetch(hostname + "/politicians/?format=json")
        .then(test => test.json())
        .then (
            (resultPoly) => {
                this.setState({
                    isLoaded: true,
                    itemsPoliticans: resultPoly,
                    politicians: resultPoly.results.map(politician => {
                        var politicianName = politician.last_name
                        return this.state.politicians.push({[politicianName] : politician.pk})
                    })
                });
                console.log(this.state.politicians)
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
            <div className="container-fluid">
                <div className="jumbotron">
                    <center><h1>Trending Sexist Tweets</h1>
                        <TweetList tweets={this.state.tweets} width="280" data-chrome="transparent noscrollbar" />
                    </center>
                </div>
                <div className="container">
                    <div className="row">
                    <Images politicians={this.state.politician}></Images>
                        <div className="col-sm col-auto">
                            <img value={this.state.politicians[0].OcasioCortez} src={AOC} className="img-fluid pics" 
                            onClick={this.handleClick.bind(this)}/>
                        </div>
                        <div className="col-sm col-auto">
                            <img value={this.state.politicians[1].Pressley} src={Pressley} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                        <div className="col-sm col-auto">
                            <img value="4" src={this.state.politicians[2].Warren} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                    </div>
              
                    <div className="row">
                        <div className="col-sm col-auto">
                            <img value={this.state.politicians[3].Harris} src={Harris} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                        <div className="col-sm col-auto">
                            <img value={this.state.politicians[4].Gillibrand} src={Gillibrand} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                        <div className="col-sm col-auto">
                            <img value={this.state.politicians[5].Collins} src={Collins} className="img-fluid pics" onClick={this.handleClick.bind(this)} />
                        </div>
                    </div>
            
            </div>


            </div>

       
        );
    }
}
}
export default Analytics