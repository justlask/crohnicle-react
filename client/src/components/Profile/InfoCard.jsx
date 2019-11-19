import React, { Component } from 'react'

export default class InfoCard extends Component {

  render() {
    console.log(this.props.user)
    return (
      <div>
        <h1>{this.props.user.username}</h1>
      </div>
    )
  }
}
