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
      enum: ["Hembra", "Macho"],
    },
    size: {
      type: String,
      enum: ["Mini", "Pequeño", "Mediano", "Grande"],
    },
    adoptionStatus: {
      type: String,
      enum: ["Adoptado", "En revisión", "Disponible para adopción"],
      default: "En revisión"
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
