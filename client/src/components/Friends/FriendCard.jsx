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
      return <Button onClick={(e) => removeFriend(e)} name="unfollow" />
    }
    else {
      return <Button onClick={(e) => addFriend(e)} name="follow" />
    }
  }

  const handleLocation = () => {
    return (!props.friend.location) ? null : <p>{props.friend.location.city}, {props.friend.location.state}</p>
  }

  return (
    <div className="friendcard">
      <img src={props.friend.image} alt=""/>
      <div className="contentbox">
        <div className="userinfo">
          <p>{props.friend.name} <Link to={`profile/${props.friend._id}`}>@{props.friend.username}</Link></p>
          <p>{props.friend.bio}</p>
          { handleLocation() }
        </div>
        <div className="friendbutton">
          {handleButton()}
        </div>
      </div>
    </div>
  )
}

export default FriendCard;
