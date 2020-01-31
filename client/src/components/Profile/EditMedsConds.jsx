import React, { useState } from 'react';
import AuthService from '../Auth/AuthService';

const EditMedsConds = (props) => {
  const service = new AuthService();
  const [ color, setColor ] = useState('#4E1681');
  const [ thing, setThing ] = useState(null)

  const isFocused = () => {
    setColor('#F05D5D')
  }

  const isBlur = () => {
    setColor('#4E1681')
  }

  const handleThing = () => {
    return (
      props.thing.map((thing, i) => {
      return <div key={i}>{thing}</div>
      })
    )
  }

  const handleChange = (e) => {
    setThing(
      e.target.value
    )
  }

  const submitThing = (e) => {
    e.preventDefault();
    let obj = {type: props.label, add: thing}
    service.updateUserMedCon(obj)
    .then(response => {
      props.updateUser(response);
      setThing('');
    })
  }

  const newThing = () => {
    return (
      <div>
        <input type="text" value={thing} placeholder="add another" onChange={(e) => handleChange(e)}/>
        <input type="submit" value="submit" onClick={(e) => submitThing(e)}/>
      </div>
    )
  }

  return (
    <div style={{borderBottomColor: color}} className="editinput" onFocus={isFocused} onBlur={isBlur}>
      <label>{props.label}</label>
      {handleThing()}
      {newThing()}
    </div>
  )
}

export default EditMedsConds;
