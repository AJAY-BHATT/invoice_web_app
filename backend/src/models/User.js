const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

module.exports = model('User', UserSchema);
