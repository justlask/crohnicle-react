import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import AuthService from '../Auth/AuthService'

export default class FriendCard extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
  }

  addFriend = (e) => {
    let user = this.props.user
    let friendID = this.props.friend._id

    this.service.addFriend(user, friendID)
    .then(response => {
      this.props.updateUser(response)
      this.props.thisFunc();
    })
  }

  removeFriend = (e) => {
    let user = this.props.user
    let friendID = this.props.friend._id

    this.service.removeFriend(user, friendID)
    .then(response => {
      this.props.updateUser(response)
      this.props.thisFunc();
    })
  }


  handleButton = () => {
    if (this.props.user.friends.includes(this.props.friend._id)) {
      return <Button onClick={(e) => this.removeFriend(e)} name="unfollow" />
    }
    else {
      return <Button onClick={(e) => this.addFriend(e)} name="follow" />
    }
  }

  render() {
    console.log(this.props.friend)
    return (
      <div className="friendcard">
          <div>
            <img src={this.props.friend.image} alt=""/>
          </div>
          <div>
            <h2>{this.props.friend.name}</h2>
            <Link to={`profile/${this.props.friend._id}`}><h3>{this.props.friend.username}</h3></Link>

            <p>{this.props.friend.location.city}, {this.props.friend.location.state}</p>
          </div>
          <div>
            {this.handleButton()}
          </div>
      </div>
    )
  }
}
