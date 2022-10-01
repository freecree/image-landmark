const {Schema, model, ObjectId} = require('mongoose');

const FileSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    user: {type: ObjectId, ref: 'User'},
    markings: Object,
    isMarked: {type: Boolean, default: false},
})

module.exports = model('File', FileSchema);