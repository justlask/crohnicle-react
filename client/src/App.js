import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' render={() => <Home />}></Route>
        <Route exact path='/signup' render={() => <Signup />}></Route>
        <Route exact path='/login' render={() => <Login />}></Route>
        {/* <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
