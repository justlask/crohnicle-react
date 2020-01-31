import React, { useState, useEffect } from 'react'
import AuthService from './Auth/AuthService'
import Status from './Profile/Status'
import Posts from './Profile/Posts'
import InfoCard from './Profile/InfoCard'

const Dashboard = (props) => {
  const service = new AuthService();
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    service.getPosts()
    .then(posts => {
      setPosts(posts.posts)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main> 
      <div>
        <InfoCard user={props.user}/>
      </div>
        <Status user={props.user} updateUser={props.updateUser} updatePosts={loadPosts} />
        <Posts user={props.user} posts={posts} updateUser={props.updateUser}  />
    </main>
  )
}

export default Dashboard;