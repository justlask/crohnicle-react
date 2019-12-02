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
      notFriends: []
    }
    this.service = new AuthService();
  }


  componentDidMount() {
    this.findFriends();
    this.myFriends();
  }

  findFriends = () => {
    this.service.findFriends(this.props.user)
    .then(response => {
      console.log(response)
        this.setState({notFriends: response});
    })
    .catch( error => console.log(error) )
  }


  myFriends = () => {
    this.service.myFriends(this.props.user)
    .then(response => {
      console.log(response)
      this.setState({friends: response})
    })
    .catch(err => console.log(err))
  }



  showFriends = (type) => {
    return (
      this.type.map((friend, i) => {
        return <FriendCard key={i} friend={friend}/>
      })
    )
  }

  render() {
    return (
      <main>
        <nav style={{color: '#4E1681'}}>
          <Button name="find friends" onClick={() => this.showFriends(this.state.notFriends)}></Button>
          <Button name="my friends" onClick={() => this.showFriends(this.state.friends)}></Button>
        </nav>
        sup these are your friends
      </main>
    )
  }
}
