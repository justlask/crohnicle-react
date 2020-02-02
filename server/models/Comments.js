const mongoose  = require('mongoose');
const Schema    = mongoose.Schema
// anything can have comments
const commentSchema = new Schema({
  author: String,
  authorID: { type : Schema.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [ {type: Schema.Types.ObjectId, ref: 'User'}],
  date: { type: Date, default: Date.now },
}, {
  timestamps: true
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;