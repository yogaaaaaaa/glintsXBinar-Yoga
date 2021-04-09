const express = require("express");

//import validator
const transaksiValidator = require("../middlewares/validators/transaksiValidator");

//import controller
const transaksiController = require("../controllers/transaksiController");
//make router
const router = express.Router();
const auth =  require("../middlewares/auth");


router.get("/",auth.user, transaksiController.getAll);
router.get("/:id",auth.admin, transaksiValidator.getOne, transaksiController.getOne);
router.post("/",auth.admin,  transaksiValidator.create, transaksiController.create);
router.put("/:id",auth.admin,  transaksiValidator.update, transaksiController.update);
router.delete("/:id",auth.admin,  transaksiValidator.delete, transaksiController.delete);

module.exports = router;