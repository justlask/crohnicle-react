import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
export default class Footer extends Component {
  render() {
    return (
      <footer>
       <p> made with <FontAwesomeIcon icon={faHeart} /> <a href="http://www.justlask.com">JustLask</a></p>
      </footer>
    )
  }
}