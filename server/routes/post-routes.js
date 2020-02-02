const express     = require('express');
const router      = express.Router();
const User        = require('../models/Users')
const Post        = require('../models/Posts');
const Comment     = require('../models/Comments')
const uploadCloud = require('../config/cloudinary.js');



router.post('/upload', uploadCloud.single('image'), (req,res,next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ image: req.file.secure_url });
})


router.post('/create', (req,res,next) => {
  console.log(req.body)
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
  console.log(req.params.id)

  Post.findByIdAndUpdate(req.params.id, {$push: { likes: req.user.id }}, {new:true})
  .populate('authorID')
  .then(post => {
    res.json(post)
  })
});

router.post('/unlike/:id', (req, res, next) => {
  console.log(req.params.id)

  Post.findByIdAndUpdate(req.params.id, {$pull: { likes: req.user.id }}, {new:true})
  .populate('authorID')
  .then(post => {
    res.json(post)
  })
});







// router.post('/delete/:id', (req,res,next) => {

//   Post.findByIdAndDelete(req.params.id).then( data => {
//     res.redirect('/user/profile')
//   })
// })


// router.get('/edit/:id', (req,res,next) => {
//   Post.findById(req.params.id).then(data => {
//     let isAuthor = false;

//     if(data.authorID.equals(req.user.id)){
//       isAuthor = true;
//       res.render("post-views/edit", {posts: data, isAuthor: isAuthor})
//     }
//     else {
//       res.redirect('/user/profile')
//     }
//   })
// });


// router.post('/edit/:id', uploadCloud.single('photo'), (req,res,next) => {

//   let postObj = {}
//   if (req.file) { postObj.image = req.file.url};
//   if (req.body.title) postObj.title = req.body.title;
//   if (req.body.content) postObj.body = req.body.content;


//   Post.findByIdAndUpdate(req.params.id, postObj).then(
//     data => {
//       console.log(data)
//       res.redirect(`/user/profile`)
//     }
//   )

// })


// router.get('/single/:id', (req,res,next) => {

//   Post.findById(req.params.id).then(data => {
//     console.log(data)
//     res.render('post-views/view', {posts: data})
//   })
// })








module.exports = router;