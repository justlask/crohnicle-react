const express = require('express');
const router = express.Router();
const User  = require('../models/Users')
const Group = require('../models/Groups')
const Comment = require('../models/Comments')
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
  .populate('comments')
  .then(group => {
    console.log(group)
    res.json(group)
  })
});


router.post('/join/:id', (req,res,next) => {
  Group.findByIdAndUpdate(req.params.id, {$push: {members: req.user.id}}, {new:true})
  .populate('admin')
  .populate('comments')
  .then(response => {
    res.json(response)
  })
});

router.post('/leave/:id', (req,res,next) => {
  Group.findByIdAndUpdate(req.params.id, {$pull: {members: req.user.id}}, {new:true})
  .populate('admin')
  .populate('comments')
  .then(response => {
    res.json(response)
  })
});




///////////////////////////////////////// old

// router.post('/create',uploadCloud.single('photo'), (req,res,next) => {
//   let newGroup = {
//     name: req.body.name,
//     summary: req.body.summary,
//     location: {
//       address: req.body.address,
//       city: req.body.city,
//       state: req.body.state,
//       zipcode: req.body.zipcode,
//     },
//     admin: req.user.id,
//     members: [req.user.id],
//   }
//   if (req.file) { newGroup.groupImage = req.file.url};
//   Group.create(newGroup).then(data => {
//     let id = data.id
//     res.redirect(`/groups/${id}`)
//   })
// })


// router.get('/:id', (req,res,next) => {

//   Group.findById(req.params.id).populate('members').populate('admin').populate('comments').then(data => {

//     let iAmAdmin = false;

//     if(req.user._id.equals(data.admin._id)){
//       iAmAdmin = true;
//     }

//     let isMember = false

//     data.members.forEach(member => {
//       if (req.user._id.equals(member._id)) {
//         isMember = true
//       }
//     })
//     res.render('group-views/viewone', {group: data, admin: iAmAdmin, isMember: isMember})
//   }).catch(err => next(err))
// })


// router.get('/', (req,res,next) => {
//   Group.find({ members: { $nin: req.user.id} }).populate('admin').populate('members').then(data => {
//     res.render('group-views/viewall', {groups: data})
//   })
// })


// router.get('/edit/:id', (req,res,next) => {
//   Group.findById(req.params.id).populate('members').populate('admin').then(data => {
//     let iAmAdmin = false;

//     if(req.user._id.equals(data.admin._id)){
//       iAmAdmin = true;
//     }
//       res.render("group-views/edit", {group: data, admin: iAmAdmin})
//   })
// })


// router.post('/edit/:id', uploadCloud.single('photo'), (req,res,next) => {
//   let groupObj = {
//     location: {},
//   }

//   if (req.file) { groupObj.groupImage = req.file.url};
//   if (req.body.name) groupObj.name = req.body.name;
//   console.log(groupObj)
//   if (req.body.address) groupObj.location.address = req.body.address;
//   if (req.body.city) groupObj.location.city = req.body.city;
//   if(req.body.state) groupObj.location.state = req.body.state;
//   if(req.body.zipcode) groupObj.location.zipcode = req.body.zipcode;
//   if (req.body.summary) groupObj.body = req.body.summary;
//   Group.findByIdAndUpdate(req.params.id, groupObj).then(

//     res.redirect(`/groups/${req.params.id}`)
//   ).catch(err => next(err))
// })


// router.post('/remove/:id/:groupID', (req,res,next) => {
//   let memberID = req.params.id
//   let groupID = req.params.groupID
//   Group.findByIdAndUpdate(groupID, { $pull: { members: memberID }}).then(data => {
//     res.redirect(`/groups/${req.params.groupID}`)
//   }).catch(err => next(err))
// })




// router.post('/join/:id', (req,res,next) => {

//   Group.findByIdAndUpdate(req.params.id, {$push: {members: req.user.id}})
//   .then(data => {
//       res.redirect(`/groups/${req.params.id}`)
//     }
//   )
// })




// //messing around with adding a "chat" feature to groups
// //create a comment in the comment schema
// //save comment id to group.comments array
// //on group page load, query all comments with that post id
// router.post('/comment/:id', (req,res,next) => {

//   let newComment = {
//     author: req.user.username,
//     authorID: req.user.id,
//     groupID: req.params.id,
//     body: req.body.content,
//     date: new Date,
//   }
//   console.log(newComment)
//   Comment.create(newComment).then(data => {
//     Group.findByIdAndUpdate( data.groupID, {$push: {comments: data.id}}).then(
//       data => {
//         res.redirect(`/groups/${data.id}`)
//       })
//   })
// })


module.exports = router;