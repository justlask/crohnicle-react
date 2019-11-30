import React, { Component } from 'react'
import SecondaryNav from '../SecondaryNav'
import Button from '../Button'

export default class Friends extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props)
  }


  render() {
    return (
      <main>
        <nav style={{color: '#4E1681'}}>
          <Button name="find friends"></Button>
          <Button name="my friends"></Button>
        </nav>
        sup these are your friends



        <div>
          <p>{this.props.user.username}</p>
        </div>
      </main>
    )
  }
}
