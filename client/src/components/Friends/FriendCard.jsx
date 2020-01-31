import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import AuthService from '../Auth/AuthService'

const FriendCard = (props) => {
  const service = new AuthService();

  const addFriend = (e) => {
    let user = props.user
    let friendID = props.friend._id

    service.addFriend(user, friendID)
    .then(response => {
      props.updateUser(response)
      props.thisFunc();
    })
  }

  const removeFriend = (e) => {
    let user = props.user
    let friendID = props.friend._id

    service.removeFriend(user, friendID)
    .then(response => {
      props.updateUser(response)
      props.thisFunc();
    })
  }


  const handleButton = () => {
    if (props.user.friends.includes(props.friend._id)) {
      return <Button className="friendbutton" onClick={(e) => removeFriend(e)} name="unfollow" />
    }
    else {
      return <Button className="friendbutton" onClick={(e) => addFriend(e)} name="follow" />
    }
  }

  return (
    <div className="friendcard">
      <img src={props.friend.image} alt=""/>
      <div>
        <div className="flexcol">
          <h2>{props.friend.name}</h2>
          <Link to={`profile/${props.friend._id}`}><h3 className="friendlink">{props.friend.username}</h3></Link>
          <p>{props.friend.location.city}, {props.friend.location.state}</p>
        </div>
        <div>
          {handleButton()}
        </div>
      </div>
    </div>
  )
}

export default FriendCard;
