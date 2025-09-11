const mongoose = requiere("mongoose")

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
    entryDate: Data,
    description: String
})

const Dog = mongoose.model ("Dog", dogSchema);

module.exports = Dog