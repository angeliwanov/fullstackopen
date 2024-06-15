const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "username length must be at least 3 characters long"],
  },
  passwordHash: { type: String, required: true },
  name: { type: String },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObjest) => {
    returnedObjest.id = returnedObjest._id.toString();
    delete returnedObjest._id;
    delete returnedObjest.__v;
    delete returnedObjest.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
