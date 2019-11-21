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
        <nav className="options">
          <Button name="my groups"></Button>
          <Button name="find groups"></Button>
          <Button name="create a group"></Button>
        </nav>
        <div>

        </div> 
      </main>
    )
  }
}
