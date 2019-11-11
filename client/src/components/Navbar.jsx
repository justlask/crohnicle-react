import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    if (!this.props.loggedInUser) {
      return (
        <header>
          <Link to="/"><h1 className="pink">crohnicles</h1></Link>
          <nav>
            <Link to="/login">log in</Link>
            <Link to="/signup">sign up</Link>
          </nav>
        </header>
      )
    }
    else {
      return (

        <header>
          <Link to="/"><h1>crohnic</h1></Link>
          <nav>
          sup user!
          </nav>
        </header>
      )
    }
  }
}
