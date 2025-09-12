const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    role: String,
  },
  {
    // Extra configuration: this second object adds extra properties: `createdAt` and `updatedAt` will show us as admins when the user create profile and when the profile was updated   
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
