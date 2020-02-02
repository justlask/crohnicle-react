const mongoose  = require('mongoose');
const Schema    = mongoose.Schema
// anything can have comments
const commentSchema = new Schema({
  author: String,
  authorID: { type : Schema.Types.ObjectId, ref: 'User' },
  content: String,
  likes: Number,
  timestamps: { type: Boolean,
    default: true
  },
  date: { type: Date, default: Date.now },
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;