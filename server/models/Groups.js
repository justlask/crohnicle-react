const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  image: {type: String, default: 'https://res.cloudinary.com/justlaskcloud/image/upload/v1580453815/Screen_Shot_2020-01-31_at_1.55.32_AM_jmb4xn.png'},
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