const { model, Schema } = require("mongoose");

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
     price: {
      type: Number,
      default: 0,
    },
    description: { type: String, default: "Product without description" },
    available: {
      type: Boolean,
      default: true,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
      required: true,
    },
    img:{type:String},
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productsSchema.methods.toJSON = function () {
  const { createdAt, updatedAt, state, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", productsSchema);
