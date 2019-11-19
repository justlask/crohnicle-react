import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../Auth/AuthService'

export default class Posts extends Component {

  constructor(props){
    super(props);
    this.service = new AuthService();
  }



  showPosts = () => {
    return this.props.posts.map((post, i) => {
    return (
      <div className="postbox" key={i}>
        <Link to={`/profile/${post.authorID}`}><p>{post.author}</p></Link>
    <sub>{post.date}</sub>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <img src={post.image} alt=""/>
      </div>
    )
    })
  }
  render() {
    return (
      <div>
        hello from posts
        {this.showPosts()}
      </div>
    )
  }
}
