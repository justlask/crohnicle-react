import React, { Component } from 'react'
import AuthService from '../Auth/AuthService'

export default class Status extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
    this.state = {}
    this.baseState = {}
  }


  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }


  handleFileUpload = e => {

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    
    this.service.handleUpload(uploadData)
    .then(response => {
        this.setState({ image: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}

  handleSubmit = (event) => {
    event.preventDefault();

    this.service.post(this.state)
    .then(data => {
      document.getElementById("status").reset()
      return this.props.handleStatusUpdate(data)
    })
  }

  render() {
    return (
      <div className="statusbox">
        <form className="status" id="status" onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="text" name="title" placeholder="give me a title" onChange={this.handleChange}/>         
            <textarea name="content" id="content" placeholder="tell me something good."  onChange={this.handleChange}></textarea>
          <div>
            <input type="file" name="photo" id="photo" onChange={(e) => this.handleFileUpload(e)} />
            <label for="photo">add a photo</label>
          </div>

          <button type="submit">share</button>
        </form> 
      </div>
    )
  }
}
