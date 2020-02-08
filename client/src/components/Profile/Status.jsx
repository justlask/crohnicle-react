import React, { useState } from 'react'
import AuthService from '../Auth/AuthService'
import StatusPhotoUpload from './StatusPhotoUpload'
import FlashMessage from '../FlashMessage'

const Status = (props) => {
  const [status, updateStatus] = useState({});
  const [posted, hasPosted] = useState(false);
  const [isHidden, setHidden] = useState(true);
  const [error, setError] = useState(null);
  const service = new AuthService();

  const handleChange = (event) => {  
    updateStatus({
      ...status,
      [event.target.name]: event.target.value
    })
  }

  const handleError = (error) => {
    setError(error);
    setHidden(false);

    setTimeout(() => setHidden(true), 4000)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    service.postStatus(status)
    .then(data => {
      document.getElementById("status").reset();
      hasPosted(true)
      props.updatePosts();
    })
    .catch(err => {
      handleError(err.response.data.message)
    })
  }

  const handlePhoto = (photo) => {
    updateStatus({
      ...status,
      image: photo
    })
  }

  return (
    <div className="statusbox">
      <form className="status" id="status" encType="multipart/form-data">
        <input type="text" name="title" placeholder="give me a title" onChange={handleChange}/>         
        <textarea name="content" id="content" placeholder="tell me something good."  onChange={handleChange} required></textarea>
        <StatusPhotoUpload handlePhoto={handlePhoto} posted={posted}/>
        <FlashMessage isHidden={isHidden} message={error}/>
        <button type="submit" onClick={handleSubmit}>share</button>
      </form> 
    </div>
  )
}

export default Status;
