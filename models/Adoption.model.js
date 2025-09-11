const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const adoptionSchema = new Schema ({
    dog: {
        type: Schema.Types.ObjectId,
        ref: "Dog"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    adoptionRequestState: [String],
    requestDate: Data,
    resolutionDate: null,
    comments: String
})

const Adoption = mongoose.model("Adoption", adoptionSchema);

module.exports = Adoption