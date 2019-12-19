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
        <nav className="secondaryNav">
          <Button className="friendbutton" name="my groups"></Button>
          <Button className="friendbutton" name="find groups"></Button>
          <Button className="friendbutton" name="create a group"></Button>
        </nav>
        <div className="content">

        </div> 
      </main>
    )
  }
}
