import React, { useState } from 'react';
import AuthService from '../Auth/AuthService';

const EditMedsConds = (props) => {
  // called it thing because it can be a medicine or a condition
  // need to come up with a better naming convention for this.

  const service = new AuthService();
  const [ color, setColor ] = useState('#4E1681');
  const [ thing, setThing ] = useState(null)

  const isFocused = () => {
    setColor('#F05D5D')
  }

  const isBlur = () => {
    setColor('#4E1681')
  }

  const deleteThis = (e, thing) => {
    e.preventDefault();
    let obj = {type: props.label, add: thing}
    service.deleteMedCon(obj)
    .then(response => {
      props.setUser(response)
      props.updateUser(response);
    })
  }

  const handleThing = () => {
    return (
      props.thing.map((thing, i) => {
        return (
          <div key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
            <p>{thing}</p>
            <button className="btn" onClick={(e) => deleteThis(e, thing)}>delete</button>
          </div>
        )
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
      props.setUser(response);
      props.updateUser(response);
      setThing('');
    })
  }

  const newThing = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <input type="text" value={thing} placeholder="add another" onChange={(e) => handleChange(e)}/>
        <input className="btn" type="submit" value="add" onClick={(e) => submitThing(e)}/>
      </div>
    )
  }

  return (
    <div style={{borderBottomColor: color}} className="editinput" onFocus={isFocused} onBlur={isBlur}>
      <label style={{color: color}}>{props.label}</label>
      {handleThing()}
      {newThing()}
    </div>
  )
}

export default EditMedsConds;
