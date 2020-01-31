import React, { useState, useEffect } from 'react'
import AuthService from '../Auth/AuthService'

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

  return (
    <main>      
      <div>
        <h1>{friend.username}</h1>
        <p>{friend.type}</p>
      </div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo pariatur aspernatur aliquid quo consectetur deserunt perferendis, accusamus nisi at rem velit quam hic eius temporibus, eaque laudantium iste beatae rerum sequi deleniti! Reiciendis reprehenderit quam officia repellat totam veniam neque, quidem minima incidunt natus et enim unde quisquam rerum ipsa facere earum libero beatae. Fugit esse porro ad rerum architecto recusandae, minima quae vel eaque reiciendis aspernatur id numquam similique, pariatur neque doloribus distinctio excepturi accusantium nemo! Ab aut dolorem facere, voluptas rerum maiores! Suscipit corporis eum culpa velit! Dolorum veritatis in possimus, tempore minima qui dolor iusto ut ratione accusantium accusamus pariatur veniam quam eum deleniti id ea asperiores quidem atque ipsam. Libero natus voluptate explicabo recusandae ipsam modi.
    </main>
  )
}

export default FriendProfile;
