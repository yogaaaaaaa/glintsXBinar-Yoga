const e = require("express");

const { barang, pelanggan, pemasok, transaksi } = require("../models");
// const {barang, pelanggan, pemasok, transaksi} = require("../../validators");

class TransaksiController {
  //get all
  async getAll(req, res) {
    try {
      let data = await transaksi.find();

      //if no data
      if (!data.length) {
        return res.status(404).json({
          message: "transaksi not found",
        });
      }

      //if success
      return res.status(200).json({
        message: "succeess",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }

  //get one
  async getOne(req, res) {
    try {
      let data = await transaksi.findOne({ _id: req.params.id });

      //if data not found
      if (!data) {
        return res.status(404).json({
          message: "transaksi not found",
        });
      }
      return res.status(200).json({
        message: "sukses",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }

  // async create(req, res){
  //     try {
  //         let findData = await Promise.all([
  //             barang.findOne({ _id: req.body.id_barang}),
  //             pelanggan.findOne({ _id: req.body.id_pelanggan}),
  //         ]);

  //         if(!findData[0] || !findData[1]){
  //             return res.status(404).json({
  //                 message: "barang or transaksi not found",
  //                 error: e,
  //             })
  //         }

  //         let total = eval(findData[0].harga * req.body.jumlah);

  //         let data = await transaksi.create({
  //             barang:findData[0],
  //             pelanggan:findData[1],
  //             jumlah: req.body.jumlah,
  //             total,
  //         });

  //         return res.status(201).json({
  //             message: "sukses",
  //             data,
  //         });
  //     } catch (e) {
  //         console.log(e);
  //         return res.status(500).json({
  //             message: "internal server error",
  //             error: e,
  //         });
  //     }
  // }
  // Create transaksi
  async create(req, res) {
    try {
      // Create data
      let data = await transaksi.create(req.body);

      // Or using this
      // let data = await transaksi.create({
      //   barang: req.body.barang,
      //   pelanggan: req.body.pelanggan,
      //   jumlah: req.body.jumlah,
      //   total: req.body.total,
      // });

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Update transaksi
  async update(req, res) {
    try {
      // Update data
      let data = await transaksi.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );
      // new is to return the updated transaksi data
      // If no new, it will return the old data before updated

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Delete transaksi
  async delete(req, res) {
    try {
      // delete data
      await transaksi.delete({ _id: req.params.id });

      return res.status(200).json({
        message: "Success",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new TransaksiController();
