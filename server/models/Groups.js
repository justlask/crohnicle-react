const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  image: String,
  admin: {type: Schema.Types.ObjectId, ref: 'User'},
  summary: String,
  members: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
  comments: [ {type: Schema.Types.ObjectId, ref: 'Comment'}],
  location: {
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zipcode: {type: String}
  },
},
{timestamps: true}
)


const Groups = mongoose.model("Groups", groupSchema)

module.exports = Groups;