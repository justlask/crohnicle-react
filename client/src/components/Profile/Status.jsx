import React, { useState } from 'react'
import AuthService from '../Auth/AuthService'

const Status = (props) => {
  const [status, updateStatus] = useState({});
  const service = new AuthService();

  const handleChange = (event) => {  
    updateStatus({
      ...status,
      [event.target.name]: event.target.value
    })
  }

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
        updateStatus({
          ...status,
           image: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    service.post(status)
    .then(data => {
      document.getElementById("status").reset();
      props.updatePosts();
    })
  }

  return (
    <div className="statusbox">
      <form className="status" id="status" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="give me a title" onChange={handleChange}/>         
        <textarea name="content" id="content" placeholder="tell me something good."  onChange={handleChange}></textarea>
        <div>
          <input type="file" name="photo" id="photo" onChange={(e) => handleFileUpload(e)} />
          <label for="photo">add a photo</label>
        </div>
        <button type="submit">share</button>
      </form> 
    </div>
  )
}

export default Status;
