import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer>
       <p> made with <FontAwesomeIcon icon={faHeart} /> <a href="http://www.justlask.com">JustLask</a></p>
    </footer>
  )
}

export default Footer;