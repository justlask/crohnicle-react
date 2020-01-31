import React, { useState } from 'react'

const EditInput = (props) => {
  const [ color, setColor ] = useState('#4E1681');

  const isFocused = () => {
    setColor('#F05D5D')
  }

  const isBlur = () => {
    setColor('#4E1681')
  }

  const handleInputs = () => {
    return (
      props.inputs.map((input, i) => {
        return <input key={i} type={props.type} placeholder={input.placeholder} defaultValue={input.value} />
      })
    )
  }

  return (
    <div style={{borderBottomColor: color}} className="editinput" onFocus={isFocused} onBlur={isBlur}>
      <label style={{color: color}}>{props.label}</label>
      {handleInputs()}
    </div>
  )
}

export default EditInput;
