import React, { Component } from 'react'
import UserImageUpload from './UserImageUpload';

export default class InfoCard extends Component {


  getInfo = (thing) => {

    if (thing.length === 0) {
      return (
        <li>Nothing to Show</li>
      )
    }
    return thing.map((element, i) => {
      return (
      <li key={i}>{element}</li>
      )
    })
  }

  render() {
    return (
      <div className="profileCard">
        <UserImageUpload />
        <h1>{this.props.user.username}</h1>
          <div className="type">
           <p>{this.props.user.type}</p>
          </div>
          <p>{this.props.user.bio}</p>
          <div>
            <h3>Medications</h3>
              {this.getInfo(this.props.user.medications)}
          </div>
          <div>
            <h3>Conditions</h3>
            {this.getInfo(this.props.user.illness)}
          </div>
          <p>{this.props.user.friends.length} friends</p>

      </div>
    )
  }
}