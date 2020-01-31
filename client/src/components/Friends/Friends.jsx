import React, { useState, useEffect } from 'react'
import SecondaryNav from '../SecondaryNav'
import AuthService from '../Auth/AuthService'
import Button from '../Button'
import FriendCard from './FriendCard'

const Friends = (props) => {
  const service = new AuthService();
  const [friends, setFriends] = useState([])
  const [buttons, setButtons] = useState({findFriends: 'activeButton', myFriends: 'notActiveButton'});
  const [borders, setBorders] = useState('content')

  
  useEffect(() => {
    service.findFriends()
    .then(response => {
      setFriends(response)
    })
  }, []);

  const findFriends = (e) => {
    service.findFriends()
    .then(response => {
      setFriends(response);
      thisFunc = findFriends;
      setButtons({findFriends: 'activeButton', myFriends: 'notActiveButton'});
      setBorders('content');
    })
    .catch( error => console.log(error) )
  }

  const myFriends = (e) => {
    service.myFriends()
    .then(response => {
      setFriends(response.friends);
      thisFunc = myFriends;
      setButtons({findFriends: 'notActiveButton', myFriends: 'activeButton'});
      setBorders('content2')
    })
  }

  let thisFunc = findFriends

  const showFriends = (e) => {
    return ( friends.map((friend, i) => {
        return <FriendCard user={props.user} thisFunc={thisFunc} myFriends={myFriends} findFriends={findFriends} updateUser={props.updateUser} key={i} friend={friend} />
     }))
  }

  return (
    <main>
      <div className="friends">
        <nav className="secondaryNav">
          <div className="navButtons">
            <Button className={buttons.findFriends} name="find friends" onClick={(e) => findFriends(e)}></Button>
            <Button className={buttons.myFriends} name="my friends" onClick={(e) => myFriends(e)}></Button>
          </div>
        </nav>
        <div className={borders}>
          <div className="contentInner">
            { showFriends() }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Friends;
