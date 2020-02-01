import React, { useState } from 'react'

const EditInput = (props) => {
  const [ color, setColor ] = useState('#4E1681');
  const [ input, setInput ] = useState({});

  const isFocused = () => {
    setColor('#F05D5D')
  }

  const isBlur = () => {
    setColor('#4E1681')
    props.setUpdates(input)
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleInputs = () => {
    return (
      props.inputs.map((input, i) => {
        return <input key={i} name={input.placeholder} type={props.type} placeholder={input.placeholder} defaultValue={input.value} onChange={(e) => handleChange(e)}/>
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
