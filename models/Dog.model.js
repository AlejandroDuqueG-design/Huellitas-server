const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const dogSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    age: Number,
    breed: String,
    sex: String, 
    size: String, 
    adoptionRequestState: [String],
    image: String,
    entryDate: Date,
    description: String
})

const Dog = mongoose.model ("Dog", dogSchema);

module.exports = Dog