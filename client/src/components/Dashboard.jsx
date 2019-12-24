import React, { Component } from 'react'
import AuthService from './Auth/AuthService'
import { Redirect } from 'react-router-dom';
import Status from './Profile/Status'
import Posts from './Profile/Posts'
import InfoCard from './Profile/InfoCard'

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.loadPosts();
  }

  handleStatusUpdate = (data) => {
    this.loadPosts();
  }


  loadPosts = () => {
    this.service.getPosts()
    .then(data => {
      this.setState({posts: data.posts})
    })
    .catch(err => console.log(err))
  }



  render() {
    if (this.props.user) {
      return (
      <main> 
        <div>
          <InfoCard user={this.props.user}/>
        </div>
          <Status user={this.props.user} updateUser={this.props.updateUser} handleStatusUpdate={this.handleStatusUpdate}/>
          <Posts user={this.props.user} updateUser={this.props.updateUser} posts={this.state.posts}handleStatusUpdate={this.handleStatusUpdate} />
      </main>

      )
    }
    else {
      return (
        <Redirect to="/" />
      )
    }
  }
}
