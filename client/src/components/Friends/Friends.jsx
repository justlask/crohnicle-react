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
      thisFunc: this.findFriends,
      activeButtons: {findFriends: 'activeButton', myFriends: 'notActiveButton'},
      borders: 'content'
    }
    this.service = new AuthService();
  }

  componentDidMount() {
    this.service.findFriends(this.props.user)
    .then(response => {
      this.setState({friends: response})
    })
  }



  findFriends = (e) => {
    this.service.findFriends(this.props.user)
    .then(response => {
        this.setState({friends: response, thisFunc: this.findFriends, activeButtons: {findFriends: 'activeButton', myFriends: 'notActiveButton'}, borders: 'content' });
    })
    .catch( error => console.log(error) )
  }

  myFriends = (e) => {
    this.service.myFriends(this.props.user)
    .then(response => {
      this.setState({friends: response.friends, thisFunc: this.myFriends, activeButtons: {findFriends: 'notActiveButton', myFriends: 'activeButton'}, borders: 'content2' })
    })
  }

  showFriends = (e) => {
      return ( this.state.friends.map((friend, i) => {
        return <FriendCard user={this.props.user} thisFunc={this.state.thisFunc} myFriends={this.myFriends} findFriends={this.findFriends} updateUser={this.props.updateUser} key={i} friend={friend} />
     }))
  }



  render() {
    return (
      <main>
        <div className="friends">
          <nav className="secondaryNav">
            <div className="navButtons">
            <Button className={this.state.activeButtons.findFriends} name="find friends" onClick={(e) => this.findFriends(e)}></Button>
            <Button className={this.state.activeButtons.myFriends} name="my friends" onClick={(e) => this.myFriends(e)}></Button>
            </div>
          </nav>
          <div className={this.state.borders}>
            <div className="contentInner">
              {this.showFriends()}
            </div>
          </div>
        </div>
      </main>
    )
  }
}
