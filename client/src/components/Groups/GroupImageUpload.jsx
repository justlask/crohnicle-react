import React, { useState } from 'react';
import AuthService from '../Auth/AuthService';

const GroupImageUpload = (props) => {
  const [image, setImage] = useState(null);
  const service = new AuthService();


  const handleFileUpload = e => {

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
      setImage(response.image);
      props.handleImage(response.image)
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  return (image) ? (
    <div>
      <label htmlFor="image">Group Image</label>
      <img className="smallimg" src={image} alt=""/>
    </div>
  ) :
  (
    <div className="floatinglabel">
      <label htmlFor="image">Group Image</label>
      <input type="file" name="image" id="image" onChange={(e) => handleFileUpload(e)}/>
    </div>
  )
}

export default GroupImageUpload;
