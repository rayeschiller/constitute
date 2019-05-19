import React, { Component } from 'react'
import './App.css'
import {Tweet} from 'react-twitter-widgets';
import logoFinal from './components/images/logoFinal.png';
import Tweets from './components/Tweets';
import About from './components/About';
import Home from './components/Home';
import Analytics from './components/Analytics';
import Map from './components/Map';
import Cloud from './components/politician_count_cloud'

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
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/home">Constitute</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="/tweets">Tweets <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/vis">Analytics <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>



{/* 
         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
         <div className="container">
         <a className="navbar-brand pull-left" href="/home">
         <div>
           <img src={logoFinal} width='100' margintop='-7' /></div></a>
           <img src={logoFinal} width='100' margintop='-7' /></div></a>
           <img src={logoFinal} width='100' margintop='-7' /></div></a>
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
             <span className="navbar-toggler-icon"></span>
             <span className="navbar-toggler-icon"></span>
           </button>
           </button>
           </button>
           <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
             <div className="navbar-nav">
               <a className="nav-item nav-link active" href="/home">Home<span className="sr-only">(current)</span></a>
               <a className="nav-item nav-link" href="/cloud">Cloud</a>
               <a className="nav-item nav-link" href="/appTweets">Tweets</a>
               <a className="nav-item nav-link" href="/analytics">Analytics</a>
               <a className="nav-item nav-link" href="/vis">Top Words</a>
               <a className="nav-item nav-link" href="/maps">Maps</a>
               <a className="nav-item nav-link" href="/politicians">Politician Breakdown</a>
             </div>
           </div>
           </div>
         </nav> */}
       <div className="App-intro">
         <Switch>
           <Route path="/home" component={Home}/>
           <Route path="/about" component={About}/>
           <Route path="/cloud" render={(props)=> <Cloud></Cloud>} />
           <Route path="/tweets" render={(props) => <Tweets {...props} tweets="home" />} />
           <Route path="/genderTweets" render={(props) => <Tweets {...props} tweets="home" />} />
           <Route path="/analytics" component={Analytics} />
           {/* <Route path='/vis' component={() => { window.location = 'http://localhost:8080/'; return null;} }/> */}
           {/* <Route path="/maps" component={Map}/> */}
           <Route path='/vis' component={() => { 
             var hostname = "";
             if (window.location.hostname === "localhost"){
               hostname = "http://localhost:8000";
             } else {
               hostname = "https://constitute.herokuapp.com"
             }
             window.location = hostname + '/data_viz/'; return null;} }/>
         </Switch>
         </div>
   
         </div>
//     <div>

//     <header>
//       <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
//         <a class="navbar-brand" href="#">Constitute</a>
//         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarCollapse">
//           <ul class="navbar-nav mr-auto">
//             <li class="nav-item">
//               <a class="nav-link" href="#">Analytics <span class="sr-only">(current)</span></a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">About</a>
//             </li>
//           </ul>
//           <form class="form-inline mt-2 mt-md-0">
//             <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
//             <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//           </form>
//         </div>
//       </nav>
//     </header>

// <main role="main">

//   {/* <div id="myCarousel" class="carousel slide" data-ride="carousel">
//     <ol class="carousel-indicators">
//       <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
//       <li data-target="#myCarousel" data-slide-to="1"></li>
//       <li data-target="#myCarousel" data-slide-to="2"></li>
//     </ol>
//     <div class="carousel-inner">
//       <div class="carousel-item active">
//         {/* {{< placeholder width="100%" height="100%" background="#777" color="#777" text="false" title="false" >}} */}
//         {/* <div class="container">
//           <div class="carousel-caption text-left">
//             <h1>Example headline.</h1>
//             <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
//             <p><a class="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
//           </div>
//         </div>
//       </div>
//       <div class="carousel-item"> */}
//         {/* {{< placeholder width="100%" height="100%" background="#777" color="#777" text="false" title="false" >}} */}
//         {/* <div class="container">
//           <div class="carousel-caption">
//             <h1>Another example headline.</h1>
//             <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
//             <p><a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
//           </div>
//         </div>
//       </div>
//       <div class="carousel-item"> */}
//         {/* {{< placeholder width="100%" height="100%" background="#777" color="#777" text="false" title="false" >}} */}
//         {/* <div class="container">
//           <div class="carousel-caption text-right">
//             <h1>One more for good measure.</h1>
//             <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
//             <p><a class="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
//           </div>
//         </div>
//       </div>
//     </div> */} */}
//     {/* <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
//       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//       <span class="sr-only">Previous</span>
//     </a>
//     <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
//       <span class="carousel-control-next-icon" aria-hidden="true"></span>
//       <span class="sr-only">Next</span>
//     </a>
//   </div> */}


//   {/* <!-- Marketing messaging and featurettes
//   ================================================== -->
//   <!-- Wrap the rest of the page in another container to center all the content. --> */}

//   <div class="container marketing">

//     {/* <!-- Three columns of text below the carousel --> */}
//     <div class="row">
//       <div class="col-lg-4">
//         {/* {{< placeholder width="140" height="140" background="#777" color="#777" class="rounded-circle" >}} */}
//         <h2>Heading</h2>
//         <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
//         <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
//       </div>
//       {/* <!-- /.col-lg-4 --> */}
//       <div class="col-lg-4">
//         {/* {{< placeholder width="140" height="140" background="#777" color="#777" class="rounded-circle" >}} */}
//         <h2>Heading</h2>
//         <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
//         <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
//       </div>
//       {/* <!-- /.col-lg-4 --> */}
//       <div class="col-lg-4">
//         {/* {{< placeholder width="140" height="140" background="#777" color="#777" class="rounded-circle" >}} */}
//         <h2>Heading</h2>
//         <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
//         <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
//       </div>
//       {/* <!-- /.col-lg-4 --> */}
//     </div>
//       {/* <!-- /.row --> */}


//     {/* <!-- START THE FEATURETTES --> */}

//     <hr class="featurette-divider"/>

//     <div class="row featurette">
//       <div class="col-md-7">
//         <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
//         <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
//       </div>
//       <div class="col-md-5">
//         {/* {{< placeholder width="500" height="500" background="#eee" color="#aaa" class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" >}} */}
//       </div>
//     </div>

//     <hr class="featurette-divider"/>

//     <div class="row featurette">
//       <div class="col-md-7 order-md-2">
//         <h2 class="featurette-heading">Oh yeah, it’s that good. <span class="text-muted">See for yourself.</span></h2>
//         <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
//       </div>
//       <div class="col-md-5 order-md-1">
//         {/* {{< placeholder width="500" height="500" background="#eee" color="#aaa" class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" >}} */}
//       </div>
//     </div>

//     <hr class="featurette-divider"/>

//     <div class="row featurette">
//       <div class="col-md-7">
//         <h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
//         <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
//       </div>
//       <div class="col-md-5">
//         {/* {{< placeholder width="500" height="500" background="#eee" color="#aaa" class="bd-placeholder-img-lg featurette-image img-fluid mx-auto" >}} */}
//       </div>
//     </div>

//     <hr class="featurette-divider"/>

//     {/* <!-- /END THE FEATURETTES --> */}

//   </div>
//   </main>
//   // {/* <!-- /.container --> */}


//   // {/* <!-- FOOTER --> */}
//   <footer class="container">
//     <p class="float-right"><a href="#">Back to top</a></p>
//     {/* <p>&copy; 2017-{{< year >}} Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p> */}
//   </footer>
//   </div>

      
    );
  }
}
export default App
