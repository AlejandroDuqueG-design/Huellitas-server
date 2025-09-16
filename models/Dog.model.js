const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const dogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    breed: String,
    sex: {
      type: String,
      enum: ["Female", "Male"],
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
    },
    adoptionStatus: {
      type: String,
      enum: ["Adopted", "Under Review", "Available", "Pending"],
      default: "Pending"
    },
    image: String,
    entryDate: Date,
    description: String,
  },
  {
    // Extra configuration: this second object adds extra properties: `createdAt` and `updatedAt` will show us as admins when the user create profile and when the profile was updated
    timestamps: true,
  }
);

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
