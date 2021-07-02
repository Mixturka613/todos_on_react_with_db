const { model, Schema } = require('mongoose')

const doSchema = new Schema({
    UserID: { type: String, required: true },
    done: { type: Boolean, required: true },
    idDo: { type: String, required: true },
    text: { type: String, required: true }
})

module.exports = model('do', doSchema)