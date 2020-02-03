import React, { useState } from 'react'
import AuthService from '../Auth/AuthService'

const AddComment = (props) => {
  const service = new AuthService();
  const [ comment, setComment ] = useState(null)

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const submitComment = (e) => {
    e.preventDefault();
    service.addPostComment(comment, props.post)
    .then(response => {
      setComment('')
      props.update(response)
      props.showAddComment(false)
    })
  }


  return (props.isVisable) ? (
    <form className="addcomment">
      <input type="text" name="comment" value={comment} placeholder="add a comment" onChange={(e) => handleChange(e)} />
      <input type="submit" name="add" onClick={(e) => submitComment(e)} />
    </form>
  ) : (
    null
  )
}

export default AddComment;
