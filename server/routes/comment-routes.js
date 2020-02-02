const express   = require('express');
const router    = express.Router();

const Comment   = require('../models/Comments');
const User      = require('../models/Users');
const Post      = require('../models/Posts');


router.post('/add', (req,res,next) => {

  let newComment = {
    author: req.user.name,
    authorID: req.user.id,
    content: req.body.comment,
  }

  Comment.create(newComment)
  .then(theComment => {

  // add comment to post
    Post.findByIdAndUpdate(req.body.post, {$push: { comments: theComment.id }}, {new: true})
    .populate('authorID')
    .then(post => {
      res.json(post)
    })
  })
});

module.exports = router;