import React, { Component } from 'react'
import { userInfo } from 'os'

export default class FriendCard extends Component {
  render() {
    return (
      <div>
        <p>{this.props.friend.username}</p>
      </div>
    )
  }
}
