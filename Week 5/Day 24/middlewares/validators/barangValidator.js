const mongoose = require("mongoose");
const validator = require("validator");
const { barang, pelanggan, pemasok, transaksi } = require("../../models");

exports.create = async (req, res, next) => {
  // Initialita
  let errors = [];

  // Check id_pemasok
  if (!mongoose.Types.ObjectId.isValid(req.body.id_pemasok)) {
    errors.push(
      "id_pemasok is not valid and must be 24 character & hexadecimal"
    );
  }

  // If params error
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  // find pemasok
  let dataPemasok = await pemasok.findOne({ _id: req.body.id_pemasok });

  // If data pemasok not found
  if (!dataPemasok) {
    errors.push("Pemasok not found");
  }

  // Check harga is number
  if (!validator.isNumeric(req.body.harga)) {
    errors.push("Harga must be a number");
  }

  // If errors length > 0, it will make errors message
  if (errors.length > 0) {
    // Because bad request
    return res.status(400).json({
      message: errors.join(", "),
    });
  }

  req.body.pemasok = req.body.id_pemasok;

  // It means that will be go to the next middleware
  next();
};

exports.getOne = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "parameter not valid!!! must use 24 char $ hexadec",
      });
    }
    next();
  };
  
  exports.update = async (req, res, next) => {
    let errors = [];
  
    //checknparameter id is valid or not
  
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      error.push("id barang is not valid and must be character and jexadec");
    }
  
    //check id abrang is valid or not
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   errors.push("id_barang is not valid and must be 24 char and hexadec");
    // }
  
    //if the parameters is not valid it will go here
  
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
  
    //find barang, pelanggan and transaksi
    let findData = await Promise.all([
      pemasok.findOne({ _id: req.body.pemasok }),
    ]);
  
    //if barang not found
    if (!findData[0]) {
      errors.push("pemasok not found");
    }
  
    //check jumlah is numeric
    if (!validator.isNumeric(req.body.harga)) {
      errors.push("harga must be a number");
    }
  
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
    let data = await barang.findOne({ _id: req.params.id });
  
    //if transaksi ot n=found
    if (!data) {
      errors.push("barang not found");
    }
  
    //if error
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
  
    next();
  };