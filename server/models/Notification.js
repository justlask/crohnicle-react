const mongoose  = require('mongoose');
const Schema    = mongoose.Schema
// only for groups/events (equivalent of a user post)
const notificationSchema = new Schema({
  title: String,
  author: String,
  authorID: { type : Schema.Types.ObjectId, ref: 'User' },
  content: String,
  image: String,
  comments: [ { type: Schema.Types.ObjectId, ref: "Comment"} ],
  date: { type: Date, default: Date.now },
  type: { type: String, enum : ["Update", "Comment"]},
  hidden: Boolean,
  likes: [ {type: Schema.Types.ObjectId, ref: "User"}],
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;