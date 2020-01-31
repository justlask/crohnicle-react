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
    return (
      posts.map((post, i) => {
        return <PostCard post={post} key={i} />
      })
    )
  }

  return (
    <main>      
      <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '20px 50px'}}>
          <img style={{width: '20%'}}src={friend.image} alt=""/> 
          <div style={{width: '70%'}}>
            <h1>{friend.name}</h1>
            <h2>@{friend.username}</h2>
            <div className="type">{friend.type}</div>
            <p>{friend.bio}</p>
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
