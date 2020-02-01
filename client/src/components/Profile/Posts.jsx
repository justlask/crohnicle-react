import React from 'react'
import PostCard from './PostCard';

const Posts = (props) => {

  const showPosts = () => {
    return props.posts.map((post, i) => {
      return (
        <PostCard post={post} key={i} />
      )
    })
  }

  return (
    <div className="posts">
      {showPosts()}
    </div>
  )
}

export default Posts;
