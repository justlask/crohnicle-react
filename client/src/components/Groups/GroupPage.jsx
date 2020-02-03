import React, { useState, useEffect } from 'react';
import AuthService from '../Auth/AuthService';
import PostCard from '../Posts/PostCard';
import Status from './Status';

const GroupPage = (props) => {
  const service = new AuthService();
  const [group, setGroup] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    service.getGroup(props.match.params.id)
    .then(group => {
      setGroup(group)
    })
    service.getGroupPosts(props.match.params.id)
    .then(posts => {
      setPosts(posts)
    })
  }, [])

  const showLocation = () => {
    return (!group.location) ? null : <p>{group.location.city}, {group.location.state}</p>
  }

  const loadPosts = () => {
    service.getGroupPosts(props.match.params.id)
    .then(posts => {
      setPosts(posts)
    })
  }

  const showPosts = () => {
    console.log(posts)
    if (posts && group) {
      return (posts.length > 0 && group.members.includes(props.user._id)) ? (
        posts.map((post, i) => {
          return <PostCard post={post} key={i} user={props.user} updatePosts={loadPosts} />
        })
      ) : (
        <div className="postbox">
          <h3>This group either has no posts, or you are not a member.</h3>
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

  const handleStatus = () => {
    if (group.members) {
      return (group.members.includes(props.user._id)) ? <Status group={group._id} user={props.user} updateUser={props.updateUser} updatePosts={loadPosts} /> : null
    }
  }

  return (
    <main>   
      <div className="friendprofile">
        <div style={{backgroundColor: 'white', borderRadius: '16px'}}>
          <div className="friendcard">
            <img src={group.image} alt=""/>
            <div className="content">
              <h1>{group.name}</h1>
              <p>{group.summary}</p>
              { showLocation() }
            </div>
            <div className="content">
              <div className="type">{(group.members) ? group.members.length : null} members</div>
              { handleJoin() }
            </div>
          </div>
          { handleStatus() }
        </div>
        <div className="posts">
          { showPosts() }
        </div>
      </div>   
    </main>
  )
}

export default GroupPage;
