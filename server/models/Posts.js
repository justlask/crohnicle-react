const mongoose  = require('mongoose');
const Schema    = mongoose.Schema
// only users make posts on their page
const postSchema = new Schema({
  title: String,
  author: String,
  authorID: { type : Schema.Types.ObjectId, ref: 'User' },
  content: String,
  image: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
  date: { type: Date, default: Date.now },
  type: { type: String, enum : ["Personal", "Health"]},
  hidden: Boolean,
  likes: [ {type: Schema.Types.ObjectId, ref: 'User'}],
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;