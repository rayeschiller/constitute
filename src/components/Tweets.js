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
  {/* <h2 className="tweetHeader">Trending Tweets</h2> */}
  <br/>
  <div className="row">
    <div className="col-sm-3 sidenav">
    <div class="container">
      <h2 className="tweetHeader">Currently Trending Tweets</h2>
      <br/>
    </div>
    <div class="container">
    <h6 color="grey">Choose Politician:</h6> 
    <div class="list-group">
      <button type="button" value="1" class="list-group-item list-group-item-action" onClick={this.onDropdownSelected.bind(this)}>
        Alexandria Ocasio Cortez
      </button>
      <button type="button" class="list-group-item list-group-item-action" value="2" onClick={this.onDropdownSelected.bind(this)}>Ayanna Pressley </button>
      <button type="button" class="list-group-item list-group-item-action" value="3" onClick={this.onDropdownSelected.bind(this)}>Nancy Pelosi</button>
      <button type="button" class="list-group-item list-group-item-action" value="4" onClick={this.onDropdownSelected.bind(this)}>Elizabeth Warren</button>
      <button type="button" class="list-group-item list-group-item-action" value="5" onClick={this.onDropdownSelected.bind(this)}>Kirsten Gillibrand</button>
      <button type="button" class="list-group-item list-group-item-action" value="6" onClick={this.onDropdownSelected.bind(this)}>Kyrsten Sinema</button>
      <button type="button" class="list-group-item list-group-item-action" value="7" onClick={this.onDropdownSelected.bind(this)}>Maxine Waters</button>
      <button type="button" class="list-group-item list-group-item-action" value="8" onClick={this.onDropdownSelected.bind(this)}>Kamala Harris</button>
      <button type="button" class="list-group-item list-group-item-action" value="9" onClick={this.onDropdownSelected.bind(this)}>Deb Haaland</button>
      <button type="button" class="list-group-item list-group-item-action" value="10" onClick={this.onDropdownSelected.bind(this)}>Abigail Spanberger</button>
      <button type="button" class="list-group-item list-group-item-action" alue="11" onClick={this.onDropdownSelected.bind(this)}>Marilyn Mosby</button>
      <button type="button" class="list-group-item list-group-item-action" value="12" onClick={this.onDropdownSelected.bind(this)}>Susan Collins</button>
      <button type="button" class="list-group-item list-group-item-action" value="13" onClick={this.onDropdownSelected.bind(this)}>Lisa Murkowski</button>
      <button type="button" class="list-group-item list-group-item-action" value="27" onClick={this.onDropdownSelected.bind(this)}>Chuck Schumer</button>
      <button type="button" class="list-group-item list-group-item-action" value="28" onClick={this.onDropdownSelected.bind(this)}>Bernie Sanders</button>
    
    
    </div>
    {/* <select className="browser-default custom-select" onChange={this.onDropdownSelected.bind(this)}>
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
        </select> */}
    </div>
    </div>
    <div className="col-sm-7 text-left tweet-list"> 
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
