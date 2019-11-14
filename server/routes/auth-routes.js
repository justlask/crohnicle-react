
const express    = require('express');
const router = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/Users');

router.post('/signup', (req,res,next) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let type = req.body.type
  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
  
    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
  
    User.findOne({username}, (err, foundUser) => {
      if (foundUser) {
        res.status(400).json({message: 'Username taken. Choose another one.'})
        return;
      }
  
      const saltRounds = 10;
      const salt  = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username: username,
        password: hash,
        email: email,
        type: type
      });
  
  
      newUser.save(err => {
        if (err) {
          res.status(400).json({
            message: 'saving user to database went wrong'
          })
          return;
        }
  
        res.status(200).json({
          message: 'your account has been created, please login'
        })
      })
  
  
  
    })
  })
  
  router.post('/login', (req,res,next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
        res.status(500).json({message: 'Something went wrong during login'})
        return;
      }
      if (!theUser) {
        res.status(401).json(failureDetails);
        return;
      }
  
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({message: 'Error during login.'})
          return;
        }
        
        res.status(200).json(theUser)
  
      })
    })(req,res,next);
  });
  
  router.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({message: "You've been logged out"});
  });
  
  router.get('/loggedin', (req,res,next) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }
    res.status(403).json({message: 'Not Authorized'})
  })
  
  
module.exports = router;