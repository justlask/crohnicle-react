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
          <section className="container boxes">
            <div className="row boxholder">
              <div className="col-xs-12 col-md-6 col-lg-3 justify">
                <div className="box">
                <img src="../images/chat.svg" alt=""/> 
              <p>share your story</p>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3 justify">
                <div className="box">
                <img src="../images/hands.svg" alt=""/>
                <p>connect with others</p>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3 justify">
                <div className="box">
                <img src="../images/people.svg" alt=""/>
                <p>form groups</p>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3 justify">
                  <div className="box">
                  <img src="../images/sports.svg" alt=""/>
                <p>create & host events</p>
                  </div>
              </div>
            </div>
          </section>
        </main>
    )
  }
}
