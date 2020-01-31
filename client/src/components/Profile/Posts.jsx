import React from 'react'
import { Link } from 'react-router-dom'

const Posts = (props) => {

  const showPosts = () => {
    return props.posts.map((post, i) => {
      return (
        <div className="postbox" key={i}>
          <Link to={`/profile/${post.authorID}`}><p>{post.author}</p></Link>
          <sub>{post.date}</sub>
          <p>{post.title}</p>
          <p>{post.body}</p>
          <img src={post.image} alt=""/>
        </div>
      )
    })
  }

  return (
    <div>
      {showPosts()}
    </div>
  )
}

export default Posts;
