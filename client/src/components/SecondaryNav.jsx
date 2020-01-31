import React from 'react'
import Button from './Button'

const SecondaryNav = (props) => {

  const createButtons = () => {
    console.log(props.options)
    return (
      props.options.map((option, i) => {
        return <Button key={i} name={option}/>
      })
    )
  }

  return (
    <div>
      {createButtons()}
    </div>
  )
}

export default SecondaryNav;