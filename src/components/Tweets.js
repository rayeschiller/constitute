import React, { Component } from 'react'
import {Tweet} from 'react-twitter-widgets';
import './styles.css'



const TweetList = (props) => {
  console.log('tweet list props');
  console.log(props)
  return (
    <div>{props.tweets.map(tweet=> <Tweet key={tweet.tweet_id} {...tweet}/>)}
    </div>

  ); 
}

class Tweets extends Component {

  handleClick() {
    console.log('torture')
  }

  onDropdownSelected(e) {
    console.log('selected');
    console.log(e.target.value);

    var hostname = "";
    if (window.location.hostname === "localhost"){
      hostname = "http://localhost:8000";
    } else {
      hostname = "https://pst-360.herokuapp.com"
    }

    console.log(hostname + `/tweets/?politicians=${e.target.value}&format=json`);
    fetch(hostname + `/tweets/?politician=${e.target.value}&format=json`)
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

  //<button onClick={this.handleClick.bind(this)}>Click me!</button>  
  

render () {
  const { error, isLoaded} = this.state;
  if (error){
    return <div> Error: {error.message}</div>
  } else if (!isLoaded){
    return <div>Loading...</div>
  } else{
  return (
  <div className="container-fluid text-center tweets">

  <h2 className="tweetHeader">Trending Tweets</h2>
  <div className="row">
    <div className="col-sm-3 sidenav">
    <select className="browser-default custom-select" onChange={this.onDropdownSelected.bind(this)}>
          <option>Choose politician</option>
          <option value="1">Alexandria Ocasio-Cortez</option>
          <option value="2">Ayanna Pressley</option>
          <option value="3">Nancy Pelosi</option>
          <option value="4">Elizabeth Warren</option>
          <option value="5">Kirsten Gillibrand</option>
          <option value="6">Kyrsten Sinema</option>
          <option value="7">Maxine Waters</option>
          <option value="8">Kamala Harris</option>
          <option value="9">Deb Haaland</option>
          <option value="10">Abigail Spanberger</option>
          <option value="11">Marilyn Mosby</option>
          <option value="12">Susan Collins</option>
          <option value="13">Lisa Murkowski</option>
          <option value="27">Chuck Schumer</option>
          <option value="28">Bernie Sanders</option>
        </select>
    </div>
    <div className="col-sm-7 text-left"> 
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
