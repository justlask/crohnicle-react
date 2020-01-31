import React, { useState } from 'react'

const EditInput = (props) => {
  const [ color, setColor ] = useState('#4E1681');

  const isFocused = () => {
    console.log("you're my focus")
    setColor('#F05D5D')
  }

  const isBlur = () => {
    console.log("not anymore...")
    setColor('#4E1681')
  }

  return (
    <div style={{borderBottomColor: color}} className="editinput" onFocus={isFocused} onBlur={isBlur}>
      <label style={{color: color}}>{props.label}</label>
      <input type="text" placeholder={props.placeholder} value={props.value} />
    </div>
  )
}

export default EditInput;
