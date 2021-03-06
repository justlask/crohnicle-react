import React, { useState, useEffect } from 'react';
import AuthService from './components/Auth/AuthService'
import { Switch, Route } from 'react-router-dom';
import './NewApp.scss';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard'
import Friends from './components/Friends/Friends'
import FriendProfile from './components/Friends/FriendProfile'
import Groups from './components/Groups/Groups'
import GroupPage from './components/Groups/GroupPage'
import Events from './components/Events/Events'
import ResetPassword from './components/Auth/ResetPassword'
import ProtectedRoute from './components/Auth/protectedRoute'
import Error404 from './components/Error404'

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
          <Route exact path="/forgot" render={() => <ResetPassword /> }></Route>

          <ProtectedRoute user={user} updateUser={updateUser} exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute user={user} updateUser={updateUser} exact path="/friends" component={Friends} />
          <ProtectedRoute user={user} updateUser={updateUser} exact path="/profile/:id" component={FriendProfile}/>
          <ProtectedRoute user={user} updateUser={updateUser} exact path="/group/:id" component={GroupPage}/>
          <ProtectedRoute user={user} updateUser={updateUser} exact path="/groups" component={Groups}/>
          <ProtectedRoute user={user} updateUser={updateUser} exact path="/events" component={Events} />
          <Route render={() => <Error404 /> }/>
        </Switch>
        <Footer />
      </div>
    );
}

export default App;
