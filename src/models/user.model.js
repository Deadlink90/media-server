const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "This field is required (name)"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "This field is required (email)"],
  },
  password: {
    type: String,
    required: [true, "This field is required (password)"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default:true
  },
  google:{
    type:Boolean,
    default:false
  }
},{
 timestamps:true,
 versionKey:false 
});

userSchema.methods.toJSON = function(){
  const {password,_id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}
module.exports = model("User", userSchema);
