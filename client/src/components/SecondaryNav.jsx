import React from 'react'
import Button from './Button'

const SecondaryNav = (props) => {

  const createButtons = () => {
    return (
      props.options.map((option, i) => {
        return <Button key={i} name={option}/>
      })
    )
  }

  return (
    <div>
      {createButtons()}
      <h1>not sure what this is supposed to be for either?
        
      </h1>
    </div>
  )
}

export default SecondaryNav;