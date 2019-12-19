import React, { Component } from 'react'
import Button from '../Button'

export default class Group extends Component {


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

  findGroups = () => {

  }

  myGroups = () => {

  }

  createGroups = () => {

  }

  render() {
    return (
      <main>
        <div className="friends">
        <nav className="secondaryNav">
          <div className="navButtons">
            <Button className="activeButton" name="my groups"></Button>
            <Button className="notActiveButton" name="find groups"></Button>
            <Button className="notActiveButton" name="create a group"></Button>
          </div>
        </nav>
        <div className="content">
            <div className="contentInner">
                Groups coming soon!
            </div>
        </div> 
        </div>
      </main>
    )
  }
}
