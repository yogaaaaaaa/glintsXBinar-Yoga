const mongoose = require("mongoose"); //importing mongoose

const uri = process.env.MONGO_URI; // adding the uri for MongoDB


//connect express to mongoDB with mongoose
mongoose
  .connect(uri, {
    useUnifiedTopology: true, //required for initialise
    useNewUrlParser: true, //required for initialise
    useCreateIndex: true, //use to enable unique data type
    useFindAndModify: false, // use findOneAndUpdate instead of findAndModify
  })
  .then(() => console.log("mongodb connecteddddddddddd"))
  .catch((err) => console.log(err));

//mporting models
const barang = require("./barang");
const pelanggan = require("./pelanggan");
const pemasok = require("./pemasok");
const transaksi = require("./transaksi");
const user = require("./user");

module.exports = { barang, pelanggan, pemasok, transaksi, user };
