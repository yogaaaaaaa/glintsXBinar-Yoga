const mongoose = require("mongoose"); //importing mongoose

const uri = process.env.MONGO_URI; // adding the uri for MongoDB

console.log(uri);
// try {
//     //connecting express to mongodb with mongodb
// mongoose.connect(uri, {
//     useUnifiedTopology: true, //required for initialise
//     useNewUrlParser: true, //required for initialise
//     useCreateIndex: true, //use to enable unique data type
//     useFindAndModify: false, // use findOneAndUpdate instead of findAndModify
//   });

//   console.log("mognoDB connected");
// } catch (e) {
//     console.log(e);
// }

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
