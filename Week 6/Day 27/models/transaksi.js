const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TransaksiSchema = new mongoose.Schema(
  {
    barang: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    pelanggan: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
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

//enable soft delete

TransaksiSchema.plugin(mongooseDelete, { overrideMethods: "all"});

module.exports = mongoose.model("transaksi", TransaksiSchema, "transaksi");