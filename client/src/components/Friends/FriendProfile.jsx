import React, { useState, useEffect } from 'react'
import AuthService from '../Auth/AuthService'
import PostCard from '../Profile/PostCard'

const FriendProfile = (props) => {
  const service = new AuthService();
  const [friend, setFriend] = useState({});
  const [posts, setPosts] = useState([])

  useEffect(() => {
    service.getProfile(props.match.params.id)
    .then(friend => {
      setFriend(friend.user);
      setPosts(friend.posts);
    })
  }, [])

  const showPosts = () => {
    return (posts.length > 0) ? (
      posts.map((post, i) => {
        return <PostCard post={post} key={i} />
      })
    ) :
    (
      <div className="postbox">
        <h1>No posts yet!</h1>
      </div>
    )
  }

  const getInfo = (thing) => {
    if (thing) {
    return (thing.length === 0) ? (
       'Nothing yet'
    ) :
    ( thing.map((element, i) => {
        return element
      }).join(", ")
    )
    }
  }

  const showLocation = () => {
    return (!friend.location) ? null : <p>{friend.location.city}, {friend.location.state}</p>
  }

  return (
    <main>   
      <div className="friendprofile">
        <div className="friendcard">
          <img src={friend.image} alt=""/>
          <div className="content">
            <h1>{friend.name}</h1>
            <h2>@{friend.username}</h2>
            <p>{friend.bio}</p>
            { showLocation() }
            <div className="type">{friend.type}</div>
          </div>
          <div className="content">
            <h5>Medications:</h5>
            <p>{getInfo(friend.medications)}</p>
            <h5>Conditions:</h5>
            <p>{getInfo(friend.conditions)}</p>
          </div>
        </div>
          <div className="posts">
            { showPosts() }
          </div>
      </div>   
    </main>
  )
}

export default FriendProfile;
