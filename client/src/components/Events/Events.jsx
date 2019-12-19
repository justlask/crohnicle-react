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
            <div className="contentInner">
                Events coming soon!
            </div>
        </div> 
        </div>
      </main>
    )
  }
}
