const express       = require('express');
const router        = express.Router();
const User          = require('../models/Users')
const Post          = require('../models/Posts');
const Comment       = require('../models/Comments');
const Notification  = require('../models/Notification');
const uploadCloud   = require('../config/cloudinary.js');



router.post('/upload', uploadCloud.single('image'), (req,res,next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ image: req.file.secure_url });
})


router.post('/create', (req,res,next) => {
  let postObj = {
    author: req.user.username,
    content: req.body.content,
    authorID: req.user.id
  }
  if (req.body.title) postObj.title = req.body.title
  if (req.body.image) postObj.image = req.body.image

  Post.create(postObj)
  .then(data => {
    res.json(data)
  })
});

router.post('/like/:id', (req, res, next) => {

  Post.findById(req.params.id)
  .then(response => {

    if (response === null) {
      // it's a group post
      Notification.findByIdAndUpdate(req.params.id, {$push: { likes: req.user.id }}, {new:true})
      .populate('authorID')
      .then(post => {
        res.json(post)
      })
    }
    // it's a users post
    Post.findByIdAndUpdate(req.params.id, {$push: { likes: req.user.id }}, {new:true})
    .populate('authorID')
    .then(post => {
      res.json(post)
    })
  })
});

router.post('/unlike/:id', (req, res, next) => {
  
  Post.findById(req.params.id)
  .then(response => {

    if (response === null) {
      //it's a group post
      Notification.findByIdAndUpdate(req.params.id, {$pull: { likes: req.user.id }}, {new:true})
      .populate('authorID')
      .then(post => {
        res.json(post)
      })
    }
    Post.findByIdAndUpdate(req.params.id, {$pull: { likes: req.user.id }}, {new:true})
    .populate('authorID')
    .then(post => {
      res.json(post)
    })
  })
});







module.exports = router;