import React, { Component } from 'react'
import { userInfo } from 'os'

export default class FriendCard extends Component {
  constructor(props) {
    super(props)
  }


  showFriends = () => {
    console.log('hey')
    return (
      this.props.friends.map((friend, i) => {
      return <div>{friend.username}</div>
      })
    )
  }


  render() {
    return (
      <div>
        {this.showFriends}
      </div>
    )
  }
}
