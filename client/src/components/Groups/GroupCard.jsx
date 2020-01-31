import React from 'react'
import { Link } from 'react-router-dom';

const GroupCard = (props) => {
  return (
    <div className="friendcard">
      <img src={props.group.image} alt=""/>
      <div>
        <div className="flexcol">
          <Link to={`/group/${props.group._id}`}><h1>{props.group.name}</h1></Link>
          <h3>{props.group.summary}</h3>
          {/* <p>{(props.group.location.address) ? props.group.location.address : null}</p>
          <p>{(props.group.location.city) ? props.group.location.city : null}, {(props.group.location.state) ? props.group.location.state : null}</p>
          <p>{props.group.members.length} members</p> */}
        </div>
      </div>
    </div>
  )
}

export default GroupCard;
