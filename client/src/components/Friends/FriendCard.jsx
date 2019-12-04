import React, { Component } from 'react'
import Button from '../Button'
import AuthService from '../Auth/AuthService'

export default class FriendCard extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
  }

  componentDidMount() {
  }


  addFriend = (e) => {
    console.log('add it')
    let user = this.props.user
    let friendID = this.props.friend._id


    console.log(this.props.user._id)
    console.log(this.props.friend._id)

    this.service.addFriend(user, friendID)
    .then(response => {
      console.log(response)
      console.log("your friend now")
    })
  }

  removeFriend = (e) => {
    console.log('remove it')
  }


  handleButton = () => {
    // return <Button onClick={this.toggleFriend} name="Follow" />
    if (this.props.user.friends.includes(this.props.friend._id)) {
      return <Button onClick={(e) => this.removeFriend(e)} name="unfollow" />
    }
    else {
      return <Button onClick={(e) => this.addFriend(e)} name="follow" />
    }
  }

  render() {
    return (
      <div className="friendcard">
          <div>
            <img src={this.props.friend.image} alt=""/>
          </div>
          <div>
            <h2>{this.props.friend.name}</h2>
            <h3>{this.props.friend.username}</h3>
            <p>{this.props.friend.location.city}, {this.props.friend.location.state}</p>
          </div>
          <div>
            {this.handleButton()}
          </div>
      </div>
    )
  }
}
