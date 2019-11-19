import React, { Component } from 'react'

export default class Profile extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        <h1>{this.props.user.username}</h1>
      </div>
    )
  }
}
