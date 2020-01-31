import React, { useState, useEffect } from 'react';
import AuthService from '../Auth/AuthService';

const GroupPage = (props) => {
  const service = new AuthService();
  const [group, setGroup] = useState({})

  useEffect(() => {
    service.getGroup(props.match.params.id)
    .then(response => {
      setGroup(response)
    })
  }, [])

  return (
    <main>
      <img src={group.image} alt=""/>
      <div>
        <h1>{(group.name) ? group.name : null}</h1>
        <p>{(group.summary) ? group.summary : null}</p>
      </div>
    </main>
  )
}

export default GroupPage;
