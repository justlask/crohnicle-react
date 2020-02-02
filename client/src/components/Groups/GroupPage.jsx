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

  return (
    <main>   
      <div className="friendprofile">
        <div className="friendcard">
          <img src={group.image} alt=""/>
          <div className="content">
            <h1>{group.name}</h1>
            {/* <h2>@{group.summary}</h2> */}
            <p>{group.summary}</p>
            { showLocation() }
            <div className="type">{(group.members) ? group.members.length : null} members</div>
          </div>
          <div className="content">
            Extra content can go here???
           <p> </p>
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
