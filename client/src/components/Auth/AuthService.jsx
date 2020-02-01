import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password, email, type) => {
    return this.service.post('/auth/signup', {username, password, email, type})
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
    return this.service.post('/auth/logout')
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

  myFriends = () => {
    return this.service.get('/user/myfriends')
    .then(response => response.data)
  }

  findFriends = () => {
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

  getProfile = (id) => {
    return this.service.get(`/user/profile/${id}`)
    .then(response => response.data)
  }

  resetPassword = (email) => {
    return this.service.post(`/auth/resetpassword`, {email})
    .then(response => response.data)
  }

  myGroups = () => {
    return this.service.get('/group/mygroups')
    .then(response => response.data)
  }

  findGroups = () => {
    return this.service.get('/group/findgroups')
    .then(response => response.data)
  }

  createGroup = (group) => {
    return this.service.post('/group/creategroup', {group})
    .then(response => response.data)
  }

  handleStatusUpload = (theFile) => {
    return this.service.post('/post/upload', theFile)
    .then(res => res.data)
    .catch(err => console.log(err))
  }
  handleUpload = (theFile) => {
    return this.service.post('/group/upload', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  handleUserPhotoUpload = (theFile) => {
    return this.service.post('/user/upload', theFile)
    .then(res => res.data)
    .catch(err => console.log(err))
  }

  getGroup = (id) => {
    return this.service.get(`/group/${id}`)
    .then(res => res.data)
  }

  updateUserMedCon = (obj) => {
    return this.service.post('/user/updatemedcon', obj)
    .then(res => res.data)
  }

  deleteMedCon = (obj) => {
    return this.service.post('/user/deletemedcon', obj)
    .then(res => res.data)
  }

  updateUser = (obj) =>{
    return this.service.post('/user/update', obj)
    .then(res => res.data)
  }



}

export default AuthService;