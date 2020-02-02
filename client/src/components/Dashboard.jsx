import React, { useState, useEffect } from 'react'
import AuthService from './Auth/AuthService'
import Status from './Profile/Status'
import Posts from './Posts/Posts'
import InfoCard from './Profile/InfoCard'
import EditProfile from './Profile/EditProfile'

const Dashboard = (props) => {
  const service = new AuthService();
  const [posts, setPosts] = useState([]);
  const [editIsHidden, setHidden] = useState(true)

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
    <main className="dash"> 
      <InfoCard user={props.user} updateUser={props.updateUser} editProfile={setHidden} loadPosts={loadPosts}/>
      <div className="secondary">
        <Status user={props.user} updateUser={props.updateUser} updatePosts={loadPosts} />
        <Posts user={props.user} posts={posts} updateUser={props.updateUser}  />
      </div>
      <EditProfile isHidden={editIsHidden} setHidden={setHidden} user={props.user} updateUser={props.updateUser} updatePosts={loadPosts}/>
    </main>
  )
}

export default Dashboard;