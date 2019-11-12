import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Signup from '../components/Auth/Signup'
import Button from '../components/Button'

export default class Home extends Component {
  render() {
    return (
        <main>
          <section className="hero">
            <h1>Find other crohnies,<br></br> locally & online</h1>
            <Button className="join" name="join now" link="signup"/>
          </section>
          <section className="flexcol">
            <div className="boxholder">
              <div className="box">
              <img src="../images/chat.svg" alt=""/> 
              <p>share your story.</p>
              </div>
              <div className="box">
                <img src="../images/deal.svg" alt=""/>
                <p>connect with others.</p>
              </div>
              <div className="box">
                <img src="../images/interview.svg" alt=""/>
                <p>form groups for support, activities, anything you want.</p>
              </div>
              <div className="box">
                <img src="../images/sports.svg" alt=""/>
                <p>create and host events.</p>
              </div>
            </div>
          </section>
          <section className="boxholder">
            <Button name="signup"/>
          </section>
        </main>
    )
  }
}
