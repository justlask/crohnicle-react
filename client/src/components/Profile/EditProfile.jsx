import React, { Component } from 'react'
import AuthService from '../Auth/AuthService'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default EditProfile;
