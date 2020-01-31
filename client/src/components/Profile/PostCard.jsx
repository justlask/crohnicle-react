import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  console.log(props)
  return (
    <div className="postbox">
      <div style={{width: '20%', height: 'auto'}}>
        <img style={{borderRadius: '8px', boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)", height: 'auto', width: '50%'}} src={props.post.authorID.image} alt=""/>
      </div>
      <div style={{width: '70%', textAlign: 'left', padding: '0px, 5%'}}>
        <p>{props.post.authorID.name} <Link style={{color: '#4E1681'}} to={`/profile/${props.post.authorID._id}`}>@{props.post.authorID.username}</Link></p>
        <div>
          <h5 style={{fontWeight: 600}}>{props.post.title}</h5>
          <p style={{fontWeight: 400}}>{props.post.content}</p>
        </div>
        <div>
          {(props.post.image) ? <img src={props.post.image}></img> : null}
        </div>
      </div>
    </div>
  )
}

export default PostCard;
