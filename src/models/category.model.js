const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    unique:true,
    required: [true, "This field is required (Category.name)"],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{
  timestamps:true,
  versionKey:false
});

categorySchema.methods.toJSON = function(){
  const {createdAt,updatedAt,state, ...data} = this.toObject();
  return data;
}

module.exports = model("Category", categorySchema);
