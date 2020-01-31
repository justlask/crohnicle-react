const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  image: {type: String, default: 'https://res.cloudinary.com/justlaskcloud/image/upload/v1580453852/Screen_Shot_2020-01-31_at_1.57.19_AM_sxl2ba.png'},
  admin: {type: Schema.Types.ObjectId, ref: 'User'},
  summary: String,
  members: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
  location: {
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zipcode: {type: String}
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  eventDate: {
    month: {type: String},
    day: {type: String},
    year: {type: String}
  }
}, {
  timestamps: true
})


const Events = mongoose.model("Events", eventSchema)

module.exports = Events;