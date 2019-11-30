import React, { Component } from 'react'
import Button from './Button'

export default class SecondaryNav extends Component {
  constructor(props) {
    super(props)
  }

  createButtons = () => {
    console.log(this.props.options)
    return (
      this.props.options.map((option, i) => {
        return <Button key={i} name={option}/>
      })
    )
  }

  render() {
    return (
      <div>
        {this.createButtons()}
      </div>
    )
  }
}
