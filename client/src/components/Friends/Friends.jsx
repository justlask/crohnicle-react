import React, { Component } from 'react'
import SecondaryNav from '../SecondaryNav'
import Button from '../Button'

export default class Friends extends Component {
  constructor(props) {
    super(props)
  }

  findFriends = () => {
    console.log('these are not your friends')
  }

  showFriends = () => {
    console.log('these are your friends')
  }

  render() {
    return (
      <main>
        <nav style={{color: '#4E1681'}}>
          <Button name="find friends" onClick={() => this.findFriends()}></Button>
          <Button name="my friends" onClick={() => this.showFriends()}></Button>
        </nav>
        sup these are your friends



        <div>
          <p>{this.props.user.username}</p>
        </div>
      </main>
    )
  }
}
