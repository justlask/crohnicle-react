import React, { useState, useEffect } from 'react';
import AuthService from '../Auth/AuthService';
import GroupCard from './GroupCard';
import CreateGroup from './CreateGroup';
import Button from '../Button';

const Groups = (props) => {
  const service = new AuthService();
  const [groups, setGroups] = useState([]);
  const [buttons, setButtons] = useState({myGroups: 'activeButton', findGroups: 'notActiveButton', createGroup: 'notActiveButton'});
  const [borders, setBorders] = useState('content');
  const [isHidden, setHidden] = useState(true)
  const [newGroup, setNewGroup] = useState(false)

  useEffect(() => {
    service.myGroups()
    .then(response => {
      setGroups(response)
    })
    console.log(groups)
  }, [])


  const findGroups = () => {
    service.findGroups()
    .then(response => {
      setHidden(true)
      setNewGroup(false)
      setGroups(response)
      thisFunc = findGroups;
      setButtons({myGroups: 'notActiveButton', findGroups: 'activeButton', createGroup: 'notActiveButton'})
      setBorders('content2')
    })
    console.log(groups)
  }

  const myGroups = () => {
    service.myGroups()
    .then(response => {
      setHidden(true)
      setNewGroup(false)
      setGroups(response)
      thisFunc = myGroups;
      setButtons({myGroups: 'activeButton', findGroups: 'notActiveButton', createGroup: 'notActiveButton'})
      setBorders('content')
    })
    console.log(groups)
  }

  const createGroups = () => {
    setHidden(false)
    setNewGroup(false)
    console.log('lets make a new group')
    setButtons({myGroups: 'notActiveButton', findGroups: 'notActiveButton', createGroup: 'activeButton'})
    thisFunc = createGroups
    setBorders('content2')
    console.log('yooooo ')
  }

  let thisFunc = myGroups

  const showGroups = () => {
    return (
      groups.map((group, i) => {
        return <GroupCard user={props.user} thisFunc={thisFunc} myGroups={myGroups} findGroups={findGroups} updateUser={props.updateUser} group={group} key={i} />
      })
    )
  }
  
  return (
    <main>
      <div className="friends">
        <nav className="secondaryNav">
          <div className="navButtons">
            <Button className={buttons.myGroups} name="my groups" onClick={myGroups}></Button>
            <Button className={buttons.findGroups} name="find groups" onClick={findGroups}></Button>
            <Button className={buttons.createGroup} name="create a group" onClick={createGroups}></Button>
          </div>
        </nav>
        <div className={borders}>
          <div className="contentInner">
            { showGroups() }
            <CreateGroup newGroup={newGroup} isCreated={setNewGroup} isHidden={isHidden}/>
          </div>
        </div> 
      </div>
    </main>
  )
}

export default Groups;