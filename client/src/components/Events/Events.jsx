import React, { Component } from 'react'
import Button from '../Button'

export default class Events extends Component {


  componentDidMount() {
    console.log('sup fam')
  }

  intro = () => {
    return (
      <div>
        this be the intro
      </div>
    )
  }

  findEvents = () => {

  }

  myEvents = () => {

  }

  createEvents = () => {

  }

  render() {
    return (
      <main>
        <div className="friends">
        <nav className="secondaryNav">
          <div className="navButtons">
            <Button className="activeButton" name="my events"></Button>
            <Button className="notActiveButton" name="find events"></Button>
            <Button className="notActiveButton" name="create an event"></Button>
          </div>
        </nav>
        <div className="content">
            <div className="contentInner" style={{color: 'white'}}>
              <h3>Events coming soon!</h3>
              <p>People will be able to create them like groups</p>
              <p>But I want to allow admins more control</p>
              <p>To send reminder emails, to check people in/out of event + tracking</p>
              <p>And put a google map of the location on there probably</p>
            </div>
        </div> 
        </div>
      </main>
    )
  }
}
