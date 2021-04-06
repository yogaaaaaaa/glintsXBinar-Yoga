const crypto = require("crypto");
const path = require("path");
const { barang, pelanggan, pemasok, transaksi } = require("../models");

class BarangController {
  async getAll(req, res) {
    try {
      let data = await barang.find();

      //if no data
      if (!data.length) {
        return res.status(404).json({
          message: "transaksi not found",
        });
      }

      //if success
      return res.status(200).json({
        message: "success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server error",
        error: e,
      });
    }
  }
  //get One
  async getOne(req, res) {
    try {
      let data = await barang.findOne({ _id: req.params.id });

      //if data not found
      if (!data) {
        return res.status(404).json({
          message: "barang not found",
        });
      }
      return res.status(200).json({
        message: "sukses",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "internal server errorrr",
        error: e,
      });
    }
  }

  async update(req, res) {
    try {
      // Update data
      let data = await barang.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body, // This is all of req.body
        {
          new: true,
        }
      );
      // new is to return the updated barang data
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
      await barang.delete({ _id: req.params.id });

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

  async create(req, res) {
    try {
      // If image was uploaded
      if (req.files) {
        const file = req.files.image;

        // Make sure image is photo
        if (!file.mimetype.startsWith("image")) {
          return res.status(400).json({ message: "File must be an image" });
        }

        // Check file size (max 1MB)
        if (file.size > 1000000) {
          return res
            .status(400)
            .json({ message: "Image must be less than 1MB" });
        }

        // Create custom filename
        let fileName = crypto.randomBytes(16).toString("hex");

        // Rename the file
        file.name = `${fileName}${path.parse(file.name).ext}`;

        // assign req.body.image with file.name
        req.body.image = file.name;

        // Upload image to /public/images
        file.mv(`./public/images/${file.name}`, async (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }
        });
      }

      // Create barang data
      let createdData = await barang.create(req.body);

      // find created data and join with pemasok
      let data = await barang
        .findOne({ _id: createdData._id })
        .populate("pemasok");

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new BarangController();
