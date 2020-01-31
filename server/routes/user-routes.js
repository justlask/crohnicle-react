const express = require('express');
const router = express.Router();
const User  = require('../models/Users')
const bcrypt     = require("bcryptjs");
const passport = require("passport");
const Post     = require('../models/Posts')
const Group     = require('../models/Groups')
const Event     = require('../models/Events')

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
    .then(data => {
      res.json({posts: data.reverse()})
    }).catch(err => next(err))
});

router.get('/myfriends', (req,res,next) => {
  User.findById(req.user._id).populate('friends').select("-password -email").then(data => {
    res.json(data)
  }).catch(err =>  next(err))
});

router.get('/findfriends', (req,res,next) => {
  User.find({ _id : { $nin: req.user.friends, $ne: req.user._id}}).select("-password -email").then(data => {
    res.json(data)
  })
});

router.put('/addfriend', (req,res,next) => {
  User.findByIdAndUpdate(req.user.id, {
    $push: {friends: req.body.friendID}
  }, {new:true}).then(data => {
    res.json(data)
  })
});

router.put('/removefriend', (req,res,next) => {
  User.findByIdAndUpdate(req.user.id, 
    { $pull: {friends: req.body.friendID }
  }, {new:true}).then(data => {
    res.json(data)
  }).catch(err => next(err))
});





router.get('/profile/:id', (req,res,next) => {

  User.findById( req.params.id ).select("-password -email").then(data =>
    Post.find({authorID: data.id})
    .populate('authorID')
    .then(posts => {
      console.log(posts)
      console.log(data)
      res.json({user: data, posts: posts.reverse()})
    })
    )
});

router.post('/updatemedcon', (req,res,next) => {
  
  User.findByIdAndUpdate(req.user.id, {$push: {[req.body.type]: req.body.add}}, {new: true})
  .then(user => {
    res.json(user)
  });

})








// router.get('/edit', (req,res,next) => {
//   //edit profile stuff will go here
//   res.render('user-views/edit')
// })

// router.post('/edit', uploadCloud.single('photo'),(req,res,next) => {
  
//   //profile changes post will go here
//   let userObj = {}
//   if (req.file) { userObj.profilePic = req.file.url};
//   if (req.body.name) userObj.name = req.body.name;
//   if (req.body.bio) userObj.bio = req.body.bio;
//   if (req.body.email) userObj.email = req.body.email;
//   if (req.body.illness) userObj.illness = req.body.illness

//   User.findByIdAndUpdate(req.user.id, userObj).then(data => {
//     res.redirect('/user/profile')
//   }).catch(err => next(err))
// });




// router.post("/delete", (req,res,next) => {
//   User.findByIdAndRemove(req.user.id).then(data => {
//     req.logout();
//   }).catch(err => next(err))
// });


// router.post('/edit/medications', (req,res,next) => {
//   if (req.body.medication) {
//     User.findByIdAndUpdate( req.user.id, {$push: {medications: req.body.medication}}).then(
//       data => {
//         res.redirect('/user/edit')
//       })
//   }
//   else {
//     User.findByIdAndUpdate(req.user.id, {$pull: {medications:{ $in: req.body.remove}}}).then(data =>{
//       res.redirect('/user/edit')
//     })
//   }
// })

// router.post('/edit/conditions', (req,res,next) => {
//   if (req.body.illness) {
//     User.findByIdAndUpdate( req.user.id, {$push: {illness: req.body.illness}}).then(
//       data => {
//         res.redirect('/user/edit')
//       })
//   }
//   else {
//     User.findByIdAndUpdate(req.user.id, {$pull: {illness:{ $in: req.body.remove}}}).then(
//       data =>{
//       res.redirect('/user/edit')
//     })
//   }
// })



// router.get('/groups', (req,res,next) => {
//   Group.find({ members: { $in: req.user.id} }).then(data => {
//     res.render('user-views/groups' , {groups: data})
//   })
// })


// router.get('/events', (req,res,next) => {
//   console.log(req.user.id)
//   Event.find({ members: { $in: req.user.id} }).then(data => {
//     console.log(data)
//     res.render('user-views/events' , {events: data})
//   })
// })


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


