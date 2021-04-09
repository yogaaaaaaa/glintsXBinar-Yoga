const mongoose = require("mongoose"); //import mongoose
const mongooseDelete = require("mongoose-delete"); //import mongoose-delete
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: encryptPassword,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  {
    //enable timestamps
    timestamps: {
      craetedAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

//encrypting the password
 function  encryptPassword(password){
  const encryptedPassword =  bcrypt.hashSync(password, 10);
  return encryptedPassword;
}

//soft deletes
UserSchema.plugin(mongooseDelete, { overrideMethods: "all"});

module.exports = mongoose.model("user", UserSchema); //exporting barang modelswqsdwdqwd
