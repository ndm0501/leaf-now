const fromidable = require('express-formidable')


const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  uploadProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productControllers");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post('/upload',fromidable(), uploadProduct);
router.delete('/:productId', deleteProduct);
router.put('/:productId', fromidable(), updateProduct);

module.exports = router;
