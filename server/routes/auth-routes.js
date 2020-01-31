
const express    = require('express');
const router = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/Users');
const nodemailer = require('nodemailer')



router.post('/signup', (req, res, next) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;
  const email = req.body.email;

  if (!username || !password) {
    console.log('no username or pass')
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {

      if(err){
        console.log(err)
          res.status(500).json({message: "Username check went bad."});
          return;
      }

      if (foundUser) {
        console.log('already exists')
          res.status(400).json({ message: 'Username taken. Choose another one.' });
          return;
      }

      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
          username: username,
          password: hashPass,
          email: email,
          type: type
      });

      aNewUser.save(err => {
          if (err) {
            console.log('error saving')
              res.status(400).json({ message: 'Saving user to database went wrong.' });
              return;
          }

          // Automatically log in user after sign up
          // .login() here is actually predefined passport method
          req.login(aNewUser, (err) => {

              if (err) {
                  res.status(500).json({ message: 'Login after signup went bad.' });
                  return;
              }
          
              // Send the user's information to the frontend
              // We can use also: res.status(200).json(req.user);
              res.status(200).json(aNewUser);
          });
      });
  });
});
  
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
      });
    })(req,res,next);
  });
  
  router.post('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(function (err) {
      if (!err) {
          res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
      } else {
          // handle error case...
          res.status(400).json({message: 'something went wrong.'})
      }
    })
  });
  
  router.get('/loggedin', (req,res,next) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }
    res.status(403).json({message: 'Not Authorized'})
  })


  router.post('/resetpassword', (req,res,next) => {
    const email = req.body.email

    User.findOne({email: email},)
    .then(foundUser => {
        console.log('user     ' + foundUser)
        if (foundUser === null) {
            // handle case if no email | username is found
            res.status(400).json({ message: 'No account with that email exists.'});
            return;
        }

        if (foundUser) {
            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let tempPass = '';

            for (let i = 0; i < 25; i++) {
              tempPass += characters[Math.floor(Math.random() * characters.length )];
            }

            const resetSalt     = bcrypt.genSaltSync(10);
            const resetPass = bcrypt.hashSync(tempPass, resetSalt);
            // change password to a random hashed pass

            User.findByIdAndUpdate(foundUser._id, {
                password: resetPass
            })
            .then(data => {
                // email that hashed pass to that email with nodemailer
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: process.env.NODE_EMAIL,
                      pass: process.env.NODE_PASS
                    }
                  });
                  let message = `<b>Hello ${data.username}, <br><br> Your temporary password is ${tempPass}. Please Click <a href="www.dosted.herokuapp.com/${data.username}/${tempPass}">here</a> to reset your password.`

                  transporter.sendMail({
                    from: '"crohnicles" <crohnicles@donotreply.com>',
                    to: email,
                    subject: `Your Password Reset Information for crohnicles`, 
                    text: message,
                    html: `<b>Hello ${data.username}, <br><br> Your temporary password is ${tempPass}. Please Click <a href="www.crohnic.herokuapp.com/reset/${data.username}/${resetPass}">here</a> to reset your password.`
                  })
                  .then(
                      res.status(200).json({message: 'we have emailed you a link to reset your password.'})
                  )
                  .catch(error => console.log(error));

            })
            console.log(`the tempPass is ${tempPass}`)
            console.log(`the resetPass is ${resetPass}`)
        }
    });

  })
  
  
module.exports = router;