import React, { Component } from 'react'
import SecondaryNav from '../SecondaryNav'
import AuthService from '../Auth/AuthService'
import Button from '../Button'
import FriendCard from './FriendCard'

export default class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: [],
      thisFunc: this.findFriends
    }
    this.service = new AuthService();
  }

  componentDidMount() {
    this.service.findFriends(this.props.user)
    .then(response => {
      this.setState({friends: response})
    })
  }



  findFriends = () => {
    this.service.findFriends(this.props.user)
    .then(response => {
        this.setState({friends: response, thisFunc: this.findFriends});
    })
    .catch( error => console.log(error) )
  }

  myFriends = () => {
    this.service.myFriends(this.props.user)
    .then(response => {
      this.setState({friends: response.friends, thisFunc: this.myFriends})
    })
  }

  showFriends = () => {
      return ( this.state.friends.map((friend, i) => {
        return <FriendCard user={this.props.user} thisFunc={this.state.thisFunc} myFriends={this.myFriends} findFriends={this.findFriends} updateUser={this.props.updateUser} key={i} friend={friend} />
     }))
  }

  render() {
    return (
      <main>
        <nav style={{color: '#4E1681'}} className="secondaryNav">
          <Button name="find friends" onClick={() => this.findFriends()}></Button>
          <Button name="my friends" onClick={() => this.myFriends()}></Button>
        </nav>
        <div className="content">
          {this.showFriends()}
        </div>

      </main>
    )
  }
}
