const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: {type: String, select: false},
  image: {type: String, default: 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg'},
  friends: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
  bio: String,
  conditions: [ {type: String} ],
  medications: [ String ],
  status: { type: String,
    enum : ["Pending Confirmation", "Active"],
    default: "Pending Confirmation"
},
  location: {
    city: {type: String, default: undefined},
    state: {type: String, default: undefined}
  },
  type: {type: String, enum: ["crohnie", "ally", "caregiver", "professional"]},
})

const User = mongoose.model("User", userSchema)

module.exports = User;