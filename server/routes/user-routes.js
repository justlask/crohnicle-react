const express = require('express');
const router = express.Router();
const User  = require('../models/Users')
const bcrypt     = require("bcryptjs");
const passport = require("passport");
const Post     = require('../models/Posts')
const Group     = require('../models/Groups')
const Event     = require('../models/Events')
const Comment   = require('../models/Comments')

const uploadCloud = require('../config/cloudinary.js');

router.post('/upload', uploadCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  User.findByIdAndUpdate(req.user.id, {image: req.file.secure_url }, {new: true})
  .then(response => {
    console.log(response)
    res.json(response);
  })
})

router.get('/posts', (req,res,next) => {
    Post.find({ $or: [ { authorID: { $in: req.user.friends } }, { authorID: req.user.id}]})
    .populate('authorID')
    .populate({
      path : 'comments',
      model: Comment,
      populate : {
        path : 'authorID',
        model: User
      }
    })
    .then(data => {
      res.json(data.reverse())
    }).catch(err => next(err))
});

router.get('/myfriends', (req,res,next) => {
  User.findById(req.user._id)
  .populate('friends')
  .select("-email")
  .then(data => {
    res.json(data)
  }).catch(err =>  next(err))
});

router.get('/findfriends', (req,res,next) => {
  User.find({ _id : { $nin: req.user.friends, $ne: req.user._id}})
  .select("-email")
  .then(data => {
    res.json(data)
  })
});

router.put('/addfriend', (req,res,next) => {
  User.findByIdAndUpdate(req.user.id, 
    { $push: {friends: req.body.friendID}}, {new:true})
    .then(data => {
    res.json(data)
  })
});

router.put('/removefriend', (req,res,next) => {
  User.findByIdAndUpdate(req.user.id, 
    { $pull: {friends: req.body.friendID }}, {new:true})
  .then(data => {
    res.json(data)
  }).catch(err => next(err))
});

router.get('/profile/:id', (req,res,next) => {

  User.findById( req.params.id )
  .select("-email")
  .then(data =>
    Post.find({authorID: data.id})
    .populate('authorID')
    .populate({
      path : 'comments',
      model: Comment,
      populate : {
        path : 'authorID',
        model: User
      }
    })
    .then(posts => {
      res.json({user: data, posts: posts.reverse()})
    })
    )
});

router.post('/updatemedcon', (req,res,next) => {

  User.findByIdAndUpdate(req.user.id, {$push: {[req.body.type]: req.body.add}}, {new: true})
  .then(user => {
    res.json(user)
  });

});

router.post('/deletemedcon', (req,res,next) => {

  User.findByIdAndUpdate(req.user.id, {$pull: {[req.body.type]: req.body.add}}, {new: true})
  .then(user => {
    res.json(user)
  })
});

router.post('/update', (req,res,next) => {
  let updateObj = {}
  if (req.body.city || req.body.state) {
    updateObj.location = {}
  }
  if (req.body.name)  updateObj.name = req.body.name
  if (req.body.bio) updateObj.bio = req.body.bio
  if (req.body.city) updateObj.location.city = req.body.city
  if (req.body.state) updateObj.location.state = req.body.state

  User.findByIdAndUpdate(req.user.id, updateObj, {new:true})
  .then(response => {
    res.json(response)
  });
})



// router.post('/filterfriends', (req,res,next) => {
//   let illnessFilter = req.body.illness
//   let medicationFilter = req.body.medication


//   if (medicationFilter && illnessFilter) {
//     User.find({ $or: [ { medications: { $in: medicationFilter } }, { illness: {$in: illnessFilter}}]}).then(users => {
//       res.render('user-views/findfriends' , {users: users})
//     })
//   }

//   if (illnessFilter) {
//     User.find({illness: {$in: illnessFilter}}).then(users => {
//       console.log(users)
//       res.render('user-views/findfriends' , {users: users})
//     })
//   }

//   if (medicationFilter) {
//     User.find({medications: {$in: medicationFilter}}).then(users => {
//       console.log(users)
//       res.render('user-views/findfriends' , {users: users})
//     })
//   }
// })


module.exports = router;


