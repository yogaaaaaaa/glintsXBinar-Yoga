const mongoose = require("mongoose"); //import mongoose
const mongooseDelete = require("mongoose-delete"); //import mongoose-delete

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

//soft deletes
UserSchema.plugin(mongooseDelete, { overrideMethods: "all"});

module.exports = mongoose.model("user", UserSchema); //exporting barang models
