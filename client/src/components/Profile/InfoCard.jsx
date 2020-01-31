import React from 'react'

const InfoCard = (props) => {

  const getInfo = (thing) => {
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


  return (
    <div className="profileCard">
      <img src={props.user.image} alt={`${props.user.username}'s profile`}/>
      <h1>{props.user.username}</h1>
      <div className="type">
       <b>{props.user.type}</b>
      </div>
      <p>{props.user.bio}</p>
      <div>
        <h3>Medications</h3>
        <ul>
          {getInfo(props.user.medications)}
        </ul>
      </div>
      <div>
        <h3>Conditions</h3>
        <ul>
          {getInfo(props.user.illness)}
        </ul>
      </div>
      <p>{props.user.friends.length} friends</p>
    </div>
  )
}

export default InfoCard;
