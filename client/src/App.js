import React, { useState, Component } from 'react';
import AuthService from './components/Auth/AuthService'
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard'
import Example from './components/NewDash'

function App() {
  const service = new AuthService;

  const [user, updateUser] = useState({
    loggedInUser: null
  });

  const fetchUser = () => {
    if(user.loggedInUser === null ){
      service.loggedin()
      .then(response =>{
        user.loggedInUser = response
      })
      .catch( err =>{
        user.loggedInUser = null
      })
    }
  }
  return (
    <div className="App">
      <Navbar user={user} updateUser={updateUser} getUser={fetchUser}/>
      <Switch>
        <Route exact path='/' render={() => <Home user={user} updateUser={updateUser}/>}></Route>
        <Route exact path='/signup' render={() => <Signup user={user} updateUser={updateUser}/>}></Route>
        <Route exact path='/login' render={() => <Login user={user} updateUser={updateUser}/>}></Route>
        <Route exact path='/dashboard' render={() => <Dashboard user={user} updateUser={updateUser} getUser={fetchUser}/>}></Route>
        <Route exact path='/testing' render={() => <Example />}></Route>
        {/* <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
