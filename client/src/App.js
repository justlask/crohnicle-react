import React, { Component } from 'react';
import AuthService from './components/Auth/AuthService'
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard'
import Example from './components/NewDash'

import Friends from './components/Friends/Friends'
import FriendProfile from './components/Friends/FriendProfile'
import Groups from './components/Groups/Groups'
import Events from './components/Events/Events'

import ResetPassword from './components/Auth/ResetPassword'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  updateUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render () {
    this.fetchUser();
    return (
      <div className="App">
        <Navbar user={this.state.loggedInUser} updateUser={this.updateUser} />
        <Switch>
          <Route exact path='/' render={(props) => <Home user={this.state.loggedInUser} {...props} updateUser={this.updateUser}/>}></Route>
          <Route exact path='/signup' render={(props) => <Signup user={this.state.loggedInUser}  {...props} updateUser={this.updateUser} />}></Route>
          <Route exact path='/login' render={(props) => <Login user={this.state.loggedInUser} {...props} updateUser={this.updateUser} />}></Route>
          <Route exact path='/dashboard' render={() => <Dashboard user={this.state.loggedInUser} updateUser={this.updateUser} getUser={this.fetchUser}/>}></Route>
          <Route exact path='/friends' render={() => <Friends user={this.state.loggedInUser} updateUser={this.updateUser}/>}></Route>
          <Route path='/profile/:id'  render={(props) => <FriendProfile user={this.state.loggedInUser}  {...props} updateUser={this.updateUser}/>}></Route>
          
          
          
          
          <Route exact path='/groups' render={() => <Groups />}></Route>
          <Route exact path='/events' render={() => <Events />}></Route>
          <Route exact path='/testing' render={() => <Example />}></Route>
          {/* <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} /> */}

          <Route exact path="/forgot" render={() => <ResetPassword /> }></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
