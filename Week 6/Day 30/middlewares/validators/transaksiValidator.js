// const { barang, pelanggan, pemasok, transaksi };
const mongoose = require("mongoose");
const validator = require("validator");
const { barang, pelanggan, pemasok, transaksi } = require("../../models");

exports.getOne = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "parameter not valid!!! must use 24 char $ hexadec",
    });
  }
  next();
};

exports.create = async (req, res, next) => {
  let errors = [];

  // Check id_barang is valid or not
  if (!mongoose.Types.ObjectId.isValid(req.body.id_barang)) {
    errors.push(
      "id_barang is not valid and must be 24 character & hexadecimal"
    );
  }

  // Check id_pelanggan is valid or not
  if (!mongoose.Types.ObjectId.isValid(req.body.id_pelanggan)) {
    errors.push(
      "id_pelanggan is not valid and must be 24 character & hexadecimal"
    );
  }

  // If the parameters is not valid it will go here
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  // Find barang and pelanggan
  let findData = await Promise.all([
    barang.findOne({ _id: req.body.id_barang }),
    pelanggan.findOne({ _id: req.body.id_pelanggan }),
  ]);

  // if barang not found
  if (!findData[0]) {
    errors.push("Barang not found");
  }

  // if pelanggan not found
  if (!findData[1]) {
    errors.push("Pelanggan not found");
  }

  // Check is jumlah numeric?
  if (!validator.isNumeric(req.body.jumlah)) {
    errors.push("Jumlah must be a number");
  }

  // If errors
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  // Calculate total
  req.body.barang = findData[0];
  req.body.pelanggan = findData[1];
  req.body.total = eval(findData[0].harga * req.body.jumlah);

  // Go to next
  next();
};


exports.update = async (req, res, next) => {
  let errors = [];

  //checknparameter id is valid or not

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    error.push("id_transaksi is not valid and must be character and jexadec");
  }

  //check id abrang is valid or not
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    errors.push("id_barang is not valid and must be 24 char and hexadec");
  }

  //if the parameters is not valid it will go here

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  //find barang, pelanggan and transaksi
  let findData = await Promise.all([
    barang.findOne({ _id: req.body.id_barang }),
    pelanggan.findOne({ _id: req.body.id_pelanggan }),
    transaksi.findOne({ _id: req.params.id }),
  ]);

  //if barang not found
  if (!findData[0]) {
    errors.push("barang not found");
  }

  //if pelanggan not found
  if (!findData[1]) {
    errors.push("pelanggan not found");
  }

  //if transaksi not found
  if (!findData[2]) {
    errors.push("transaksi not found");
  }

  //check jumlah is numeric
  if (!validator.isNumeric(req.body.jumlah)) {
    errors.push("jumlah must be a number");
  }

  //if error
  if (errors.lenth > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }
  //calculate total
  req.body.barang = findData[0];
  req.body.pelanggan = findData[1];
  req.body.total = eval(findData[0].harga * req.body.jumlah);

  next();
};

exports.delete = async (req, res, next) => {
  let errors = [];

  //cjecl params is valid or not
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    errors.push(" id_transaksi is not valid and must be 24 char and hexa");
  }

  //if params error
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  //find one transaksi
  let data = await transaksi.findOne({ _id: req.params.id });

  //if transaksi ot n=found
  if (!data) {
    errors.push("transaksi not found");
  }

  //if error
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  next();
};
