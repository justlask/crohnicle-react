import React, { useState } from 'react'

const EditMedsConds = (props) => {
  const [ color, setColor ] = useState('#4E1681');

  const isFocused = () => {
    setColor('#F05D5D')
  }

  const isBlur = () => {
    setColor('#4E1681')
  }

  const handleThing = () => {
    return (
      props.thing.map((thing, i) => {
      return <div>{thing}</div>
      })
    )
  }

  const addThing = () => {
    return (
      <div>
        <input type="text" placeholder="add another" />
        <input type="submit" value="submit"/>
      </div>
    )
  }
  
  return (
    <div style={{borderBottomColor: color}} className="editinput" onFocus={isFocused} onBlur={isBlur}>
      <label>{props.label}</label>
      {handleThing()}
      {addThing()}
    </div>
  )
}

export default EditMedsConds;
