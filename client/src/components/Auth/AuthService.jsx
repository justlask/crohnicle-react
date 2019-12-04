import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password) => {
    return this.service.post('/auth/signup', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/auth/logout', {})
    .then(response => response.data)
  }

  handleUpload (theFile) {
    return this.service.post('/user/upload', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  post = (status) => {
    return this.service.post('/post/create', status)
    .then(response => response.data)
  }

  getPosts = () => {
    return this.service.get('/user/posts')
    .then(response => response.data)
  }

  myFriends = (user) => {
    return this.service.get('/user/myfriends')
    .then(response => response.data)
  }

  findFriends = (user) => {
    return this.service.get('/user/findfriends')
    .then(response => response.data)
  }

  addFriend = (user, friendID) => {
    return this.service.put('/user/addfriend', {user, friendID})
    .then(response => response.data)
  }

  removeFriend = (user, friendID) => {
    return this.service.put('/user/removefriend', {user, friendID})
    .then(response => response.data)
  }

}

export default AuthService;