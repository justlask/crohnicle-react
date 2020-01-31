import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  console.log(props)
  return (
    <div className="postbox">
      <div style={{width: '20%', height: 'auto'}}>
        <img src={props.post.authorID.image} alt=""/>
      </div>
      <div style={{width: '70%', textAlign: 'left', padding: '5%'}}>
        <p>{props.post.authorID.name} <Link style={{color: '#4E1681'}} to={`/profile/${props.post.authorID._id}`}>@{props.post.authorID.username}</Link></p>
        <div>
          <h5 style={{fontWeight: 600}}>{props.post.title}</h5>
          <p style={{fontWeight: 400}}>{props.post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
