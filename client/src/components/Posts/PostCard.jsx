import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments'
import PostOptions from './PostOptions'
import AddComment from '../Comments/AddComment'
import EditPost from './EditPost'

const PostCard = (props) => {
  const [ showAddComment, setShowAddComment ] = useState(false);
  const [ showComments, setShowComments ] = useState(false)

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
        <PostOptions post={props.post} user={props.user} update={props.updatePosts} showAddComment={setShowAddComment} showAddCommentVariable={showAddComment} showComments={setShowComments} showCommentsVariable={showComments}/>
        <Comments isVisable={showComments} showComments={setShowComments} comments={props.post.comments}/>
        <AddComment isVisable={showAddComment} showAddComment={setShowAddComment} post={props.post._id} update={props.updatePosts}/>
      </div>
      <EditPost />
    </div>
  )
}

export default PostCard;
