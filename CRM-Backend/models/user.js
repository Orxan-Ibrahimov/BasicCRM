const mongoose = require("mongoose");
const { Roles } = require("../helpers/enums/role");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  registrationDate: {
    type: Date,
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    required: true,
  },
});

Object.assign(UserSchema.statics, {
  Roles,
});

const User = mongoose.model("User", UserSchema);

exports.User = User;
