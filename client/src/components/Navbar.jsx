import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'

const Navbar = (props) => {
  if (props.user) {
    return (
      <header>
        <Link to="/"><h1 className="pink">crohnicles</h1></Link>
        <nav>
          <NavLink activeClassName='is-active' to="/groups">groups</NavLink>
          <NavLink activeClassName='is-active' to="/events">events</NavLink>
          <NavLink activeClassName='is-active' to="/friends">friends</NavLink>
          <Button link="/" className="noButton" name="logout" onClick={props.logoutUser}></Button>
        </nav>
      </header>
    )
  }
  else {
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
}

export default Navbar;
