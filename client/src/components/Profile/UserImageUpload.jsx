import React, { useState } from 'react'
import AuthService from '../Auth/AuthService'

const UserImageUpload = (props) => {
  const service = new AuthService();
  const [upload, setUpload] = useState(props.user.image);

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    service.handleUserPhotoUpload(uploadData)
    .then(response => {
      console.log(response)
      setUpload(response.image)
      props.updateUser(response)
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }
  
  return (
    <label HTMLfor="image" className="userimgbox">
      <input type="file" name="image" id="image" style={{display: 'none'}} onChange={e => handleFileUpload(e)}/>
      <span>update</span>
      <img src={upload}/>
    </label>
  )
}

export default UserImageUpload;
