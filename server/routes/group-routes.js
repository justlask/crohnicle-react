const express = require('express');
const router = express.Router();
const User  = require('../models/Users')
const Group = require('../models/Groups')
const Comment = require('../models/Comments')
const Notification = require('../models/Notification')
const uploadCloud = require('../config/cloudinary.js');


router.post('/upload', uploadCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ image: req.file.secure_url });
});

router.get('/mygroups', (req,res,next) => {
  Group.find({ members: { $in: req.user.id} })
  .populate('admin')
  .populate('members')
  .then(groups => {
    res.json(groups)
  })
});

router.get('/findgroups', (req,res,next) => {
  Group.find({ members: { $nin: req.user.id} })
  .populate('admin')
  .populate('members')
  .then(groups => {
    res.json(groups)
  })
});

router.post('/creategroup', (req,res,next) => {
  const newGroup = {
    name: req.body.group.name,
    summary: req.body.group.summary,
    location: {
      address: req.body.group.address,
      city: req.body.group.city,
      state: req.body.group.state,
      zipcode: req.body.group.zipcode,
    },
    admin: req.user.id,
    members: [req.user.id],
  }

  if (req.body.group.image) {
    newGroup.image = req.body.group.image
  }

  Group.create(newGroup)
  .then(theGroup => {
    res.json(theGroup)
  })
  .catch(err => {
    res.json(err)
  })
});


router.get('/:id', (req,res,next) => {
  Group.findById(req.params.id)
  .populate('admin')
  .populate('notifications')
  .then(group => {
    console.log(group)
    res.json(group)
  })
});


router.post('/join/:id', (req,res,next) => {
  Group.findByIdAndUpdate(req.params.id, {$push: {members: req.user.id}}, {new:true})
  .populate('notifications')
  .then(response => {
    res.json(response)
  })
});

router.post('/leave/:id', (req,res,next) => {
  Group.findByIdAndUpdate(req.params.id, {$pull: {members: req.user.id}}, {new:true})
  .populate('admin')
  .populate('notifications')
  .then(response => {
    res.json(response)
  })
});


module.exports = router;