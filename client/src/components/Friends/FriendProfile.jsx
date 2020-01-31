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
    return (posts > 0) ? (
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
    return (!thing) ? (
       'Nothing yet'
    ) :
    ( thing.map((element, i) => {
        return element
      }).join(", ")
    )
  }

  return (
    <main>      
      <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '20px 50px'}}>
          <img style={{width: '20%', borderRadius: 16, boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)'}}src={friend.image} alt=""/> 
          <div style={{width: '70%', textAlign: 'left', display: 'flex'}}>
            <div style={{width: '50%'}}>
              <h1>{friend.name}</h1>
              <h2>@{friend.username}</h2>
              <p>{friend.bio}</p>
              <div className="type">{friend.type}</div>
            </div>
            <div style={{width: '50%'}}>
              <h5>Medications:</h5>
              <p>{getInfo(friend.medications)}</p>
              <h5>Conditions:</h5>
              <p>{getInfo(friend.conditions)}</p>
            </div>
          </div>
        </div>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          { showPosts() }
        </div>
      </div>

    </main>
  )
}

export default FriendProfile;
