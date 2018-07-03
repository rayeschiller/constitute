import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor () {
    super() 
    this.state = {
      username: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    axios.get('https://localhost:8000/index')
      .then(response => console.log(response))
    
  }

  render () {
    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>
  Click Me
</button>
      </div>
    )
  }
}
export default App