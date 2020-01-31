import React, { useState } from 'react'
import AuthService from '../Auth/AuthService'

const StatusPhotoUpload = (props) => {
  const service = new AuthService();
  const [image, setImage] = useState(null);

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    service.handleStatusUpload(uploadData)
    .then(response => {
        setImage(response.image);
        props.handlePhoto(response.image)
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  return (image && !props.posted) ? (
    <div>
      <img src={image} alt=""/>
    </div>
  ):
  (
    <div>
      <label for="photo">add a photo</label>
      <input type="file" name="photo" id="photo" onChange={(e) => handleFileUpload(e)} />
    </div>
  )
}

export default StatusPhotoUpload;