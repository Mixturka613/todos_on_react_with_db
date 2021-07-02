
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    id: { type: String, required: true },
    login: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

module.exports = model('User', userSchema)