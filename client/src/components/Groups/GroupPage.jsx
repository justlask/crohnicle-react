import React, { useState, useEffect } from 'react';
import AuthService from '../Auth/AuthService';
import PostCard from '../Posts/PostCard';

const GroupPage = (props) => {
  const service = new AuthService();
  const [group, setGroup] = useState({})

  useEffect(() => {
    service.getGroup(props.match.params.id)
    .then(response => {
      console.log(response)
      setGroup(response)
    })
  }, [])

  const showLocation = () => {
    return (!group.location) ? null : <p>{group.location.city}, {group.location.state}</p>
  }

  const showPosts = () => {
    if (group.notifications){
      return (group.notifications.length > 0) ? (
        group.notifications.map((post, i) => {
          return <PostCard post={post} key={i} />
        })
      ) : (
        <div className="postbox">
          <h1>No posts yet!</h1>
        </div>
      )
    }
  }

  const joinGroup = () => {
    service.joinGroup(group._id)
    .then(response => {
      setGroup(response)
    })
  }

  const leaveGroup = () => {
    service.leaveGroup(group._id)
    .then(response => {
      setGroup(response)
    })
  }

  const handleJoin = () => {
    if (group.members) {
      return (group.members.includes(props.user._id)) ? (
        <button className="joinbtn" onClick={leaveGroup}>leave group</button>
      ) : (
        <button className="joinbtn" onClick={joinGroup}>join group</button>
    )
    }
  }

  return (
    <main>   
      <div className="friendprofile">
        <div className="friendcard">
          <img src={group.image} alt=""/>
          <div className="content">
            <h1>{group.name}</h1>
            <p>{group.summary}</p>
            { showLocation() }
          </div>
          <div className="content">
            <div className="type">{(group.members) ? group.members.length : null} members</div>
          {handleJoin()}
          </div>
        </div>
          <div className="posts">
            { showPosts() }
          </div>
      </div>   
    </main>
  )
}

export default GroupPage;
