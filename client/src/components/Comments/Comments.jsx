import React from 'react'
import { Link } from 'react-router-dom'

const Comments = (props) => {

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
      </div>
  ) : null
}

export default Comments;
