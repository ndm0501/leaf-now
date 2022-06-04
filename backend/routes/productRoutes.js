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
const { verifyToken, isSellerOrDonor, isSellerOrDonorAuthorized } = require('../middleware/jwtAuth');

router.get("/",  getProducts);
router.get("/:id", getProductById);
router.post('/upload',verifyToken, isSellerOrDonor,  fromidable(), uploadProduct);
router.delete('/:productId',verifyToken, isSellerOrDonor, isSellerOrDonorAuthorized, deleteProduct);
router.put('/:productId', verifyToken, isSellerOrDonor, isSellerOrDonorAuthorized, fromidable(), updateProduct);

module.exports = router;
