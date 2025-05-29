const {model,Schema} = require("mongoose");

const roleSchema = new Schema({
  name:{
  type:String,  
  required:true  
  }
},{
timestamps:true,
versionKey:false  
})

module.exports = model("Role",roleSchema);