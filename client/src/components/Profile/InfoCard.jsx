import React from 'react'
import UserImageUpload from './UserImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const InfoCard = (props) => {
  
  const getInfo = (thing) => {
    return (thing.length === 0) ? (
        'Nothing to Show'
    ) :
    ( thing.map((element, i) => {
        return element
      }).join(', ')
    )
  }

  return (
    <div className="profileCard">
        <button onClick={(e) => props.editProfile(false)}>
          <FontAwesomeIcon className="icon" icon={faPencilAlt} />
        </button>
      <div className="profileimg">
        <UserImageUpload user={props.user} updateUser={props.updateUser} loadPosts={props.loadPosts} />
      </div>
      <div className="userinfo">
        <h2>{props.user.name}</h2>
        <h4>@{props.user.username}</h4>
        <p>{props.user.bio}</p>
        <div className="type">
        <b>{props.user.type}</b>
        </div>
        <p>{props.user.friends.length} friends</p>
      </div>
      <div className="userinfo">
        <div>
          <h5>Medications:</h5>
          <p>
            {getInfo(props.user.medications)}
          </p>
        </div>
        <div>
          <h5>Conditions:</h5>
          <p>
            {getInfo(props.user.conditions)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoCard;
