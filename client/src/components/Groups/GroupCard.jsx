import React from 'react'
import { Link } from 'react-router-dom';

const GroupCard = (props) => {

  const handleLocation = () => {
    return (!props.group.location) ? 
    null :
    (<p>{props.group.location.city}, {props.group.location.state}</p>)
  }
  return (
    <div className="friendcard">
      <img src={props.group.image} alt=""/>
      <div className="contentbox">
        <div className="userinfo">
          <h5><Link to={`/group/${props.group._id}`}>{props.group.name}</Link></h5>
          <p>{props.group.summary}</p>
          { handleLocation() }
        </div>
      </div>
    </div>
  )
}

export default GroupCard;
