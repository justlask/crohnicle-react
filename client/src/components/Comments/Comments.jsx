import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'

const Comments = (props) => {
  const [ showAddComment, setShowAddComment ] = useState(true);

  const displayComments = () => {
    return props.comments.map((comment, i) => {
      return (
        <div className="commentcard" key={i}>
          <img src={comment.authorID.image} alt=""/>
          <div>
            <p>{comment.authorID.name} <Link to={`/profile/${comment.authorID._id}`}>@{comment.authorID.username}</Link></p>
            <p>{comment.content}</p>
          </div>
        </div>
      )
    })
  }

  return (props.isVisable) ? (
      <div>
        { displayComments() }
        <AddComment isVisable={showAddComment} showAddComment={setShowAddComment} post={props.post} update={props.update}/>
      </div>
  ) : null
}

export default Comments;
