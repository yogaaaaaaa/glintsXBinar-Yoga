const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");//importing soft deletes

const BarangSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      unique: true,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    pemasok: {
      type: mongoose.Schema.ObjectId,
      ref: "pemasok",
      required: true,
    },
    image: {
      type: String,
      default: null,
      required: false,
      //get
      get: getImage,
    },
  },
  {
      //enable timestamps
    timestamps: {
      craetedAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {getters:true},
  }
);

//getter function for barang
function getImage(image) {
  return `/images/${image}`;
}

//soft deletes
BarangSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("barang", BarangSchema, "barang"); //exporting barang models