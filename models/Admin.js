const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  adminUsername: {
    type: String,
    required: [true, `Please enter the correct admin username.`],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, `Please enter the correct admin password.`],
    trim: true,
  },
})

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
