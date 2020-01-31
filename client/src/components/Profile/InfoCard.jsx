import React from 'react'
import UserImageUpload from './UserImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const InfoCard = (props) => {
  
  const getInfo = (thing) => {
    return (thing.length === 0) ? (
        <li>Nothing to Show</li>
    ) :
    ( thing.map((element, i) => {
        return element
      }).join(', ')
    )
  }

  return (
    <div className="profileCard">
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <button style={{backgroundColor: 'inherit', border: 'none', alignSelf: 'flex-end', padding: '10px'}} onClick={(e) => props.editProfile(false)}>
          <FontAwesomeIcon style={{color: 'black', fontSize: '22px' }}icon={faPencilAlt} />
        </button>
        <UserImageUpload user={props.user} updateUser={props.updateUser} />
      </div>
      <div style={{paddingBottom: '25px'}}>
        <h2>{props.user.name}</h2>
        <h4>@{props.user.username}</h4>
        <p>{props.user.bio}</p>
        <div className="type">
        <b>{props.user.type}</b>
        </div>
        <p>{props.user.friends.length} friends</p>
      </div>

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
  )
}

export default InfoCard;
