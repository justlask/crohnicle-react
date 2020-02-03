import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../Auth/AuthService';

const PostOptions = (props) => {
  const service = new AuthService();

  const addLike = (e) => {
    service.addLike(props.post._id)
    .then(response => {
      props.update(response)
    })
  }

  const removeLike = (e) => {
    service.removeLike(props.post._id)
    .then(response => {
      props.update(response)
    })
  }

  const addComment = (e) => {
    props.showAddComment(!props.showAddCommentVariable);
  }

  const handleLike = (e) => {
    return (props.post.likes.includes(props.user._id)) ? (
      <button onClick={(e) => removeLike(e)}>
      {props.post.likes.length}
      <FontAwesomeIcon className="liked" icon={faHeart} />
      </button>
    ) : (
      <button onClick={(e) => addLike(e)}>
      {props.post.likes.length}
      <FontAwesomeIcon  className="unliked" icon={faHeart} />
      </button>
    )
  }

  const showComments = () => {
    props.showComments(!props.showCommentsVariable)
  }

  return (props.post.comments.length > 0) ? (
    <div>
      <div className="interactbtns">
        { handleLike() }
        <button onClick={(e) => addComment(e)}>
          {props.post.comments.length}
          <FontAwesomeIcon className="icon" icon={faComment} />
        </button>
      </div>
      <button className="commentsbtn" onClick={(e) => showComments(e)}>view all {props.post.comments.length} comments</button>
    </div>
  ) : (
    <div>
      <div className="interactbtns">
        { handleLike() }
        <button onClick={(e) => addComment(e)}>
          {props.post.comments.length}
          <FontAwesomeIcon className="icon" icon={faComment} />
        </button>
      </div>
    </div>
  )
}

export default PostOptions;
