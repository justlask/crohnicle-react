const express       = require('express');
const router        = express.Router();

const Notification  = require('../models/Notification');
const Comment       = require('../models/Comments');
const User          = require('../models/Users');
const Group         = require('../models/Groups')


router.post('/create', (req,res,next) => {
  let postObj = {
    author: req.user.username,
    content: req.body.content,
    authorID: req.user.id
  }
  if (req.body.title) postObj.title = req.body.title
  if (req.body.image) postObj.image = req.body.image

  Notification.create(postObj)
  .then(data => {
    Group.findByIdAndUpdate(req.body.group, {$push: {notifications: data._id}}, {new: true})
    .then(response => {
      res.json(response)
    })
  })
});

router.get('/:id', (req,res,next) => {
  Group.findById(req.params.id)
  .populate('authorID')
  .populate('comments')
  .populate({
    path : 'notifications',
    model: Notification,
    populate : {
      path : 'comments',
      model: Comment,
      populate: {
        path: 'authorID',
        model: User,
      }
    }
  })
  .populate({
    path : 'notifications',
    model: Notification,
    populate : {
      path : 'authorID',
      model: User,
    }
  })
  .then(response => {
    res.json(response.notifications.reverse())
  })
});



module.exports = router;