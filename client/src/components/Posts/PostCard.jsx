import React from 'react';
import { Link } from 'react-router-dom';
// import Comments from '../Comments/Comments'
import PostOptions from './PostOptions'
import EditPost from './EditPost'

const PostCard = (props) => {
  return (
    <div className="postbox">
      <img className="userimg" src={props.post.authorID.image} alt=""/>
      <div className="contentbox">
        <p>{props.post.authorID.name} <Link to={`/profile/${props.post.authorID._id}`}>@{props.post.authorID.username}</Link></p>
        <div>
          <h5>{props.post.title}</h5>
          <p>{props.post.content}</p>
        </div>
        <div>
          {(props.post.image) ? <img src={props.post.image}></img> : null}
        </div>
        <PostOptions />
      </div>
      <EditPost />
    </div>
  )
}

export default PostCard;
