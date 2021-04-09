const express = require("express");

//import validator
const barangValidator = require("../middlewares/validators/barangValidator");

//import controller
const barangController = require("../controllers/barangController");
//make router
const router = express.Router();
const auth = require("../middlewares/auth")


router.get("/",auth.user, barangController.getAll);
router.get("/:id",auth.admin, barangValidator.getOne, barangController.getOne);
router.post("/",auth.admin, barangValidator.create, barangController.create);
router.put("/:id",auth.admin, barangValidator.update, barangController.update);
router.delete("/:id",auth.admin, barangValidator.delete, barangController.delete);

module.exports = router;