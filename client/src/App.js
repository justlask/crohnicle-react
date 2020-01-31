import React, { useState, useEffect } from 'react';
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
import ProtectedRoute from './components/Auth/protectedRoute'

const App = () => {
  const service = new AuthService();
  const [user, updateUser] = useState(null);

  const fetchUser = () => {
    if( user === null ){
      service.loggedin()
      .then(response =>{
        updateUser(response);
      })
      .catch( err =>{
        updateUser(false)
      })
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  const logoutUser = () => {
    service.logout()
    .then(data => {
      updateUser(null);
    })
  }

    return (
      <div className="App">
        <Navbar user={user} logoutUser={logoutUser} />
        <Switch>
          <Route exact path='/' render={(props) => <Home user={user} {...props} updateUser={updateUser}/>}></Route>
          <Route exact path='/signup' render={(props) => <Signup user={user}  {...props} updateUser={updateUser} />}></Route>
          <Route exact path='/login' render={(props) => <Login user={user} {...props} updateUser={updateUser} />}></Route>

          <ProtectedRoute user={user} updateUser={updateUser} path="/dashboard" component={Dashboard} />
          {/* <Route exact path='/dashboard' render={() => <Dashboard user={user} updateUser={updateUser} getUser={fetchUser}/>}></Route> */}
          <Route exact path='/friends' render={() => <Friends user={user} updateUser={updateUser}/>}></Route>
          <Route path='/profile/:id'  render={(props) => <FriendProfile user={user}  {...props} updateUser={updateUser}/>}></Route>
    
          
          
          
          <Route exact path='/groups' render={() => <Groups />}></Route>
          <Route exact path='/events' render={() => <Events />}></Route>
          <Route exact path='/testing' render={() => <Example />}></Route>
          {/* <ProtectedRoute user={user} path='/projects/:id' component={ProjectDetails} /> */}

          <Route exact path="/forgot" render={() => <ResetPassword /> }></Route>
        </Switch>
        <Footer />
      </div>
    );
}

export default App;
