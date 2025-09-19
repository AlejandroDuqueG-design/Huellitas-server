const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const adoptionSchema = new Schema(
  {
    dog: {
      type: Schema.Types.ObjectId,
      ref: "Dog",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    adoptionRequestState: {
      type: String,
      enum: ["Aprobado", "En revisión", "Rechazado", "Pendiente"],
      default: "En revisión"
    },
    resolutionDate: Date,
    comments: String,
  },
  {
    // Extra configuration: this second object adds extra properties: `createdAt` and `updatedAt` will show us as admins when the user create profile and when the profile was updated
    timestamps: true,
  }
);

const Adoption = mongoose.model("Adoption", adoptionSchema);

module.exports = Adoption;
