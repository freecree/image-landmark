const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, required: true},
    diskSpace: {type: Number, default: 100*1024*1024},
    usedSpace: {type: Number, default: 0},
})

module.exports = model('User', UserSchema);