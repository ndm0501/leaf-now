const Product = require("../models/Product");
const cloudinary = require('../utils/cloudinary');
const { v4: uuidv4 } = require('uuid');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting product details" });
  }
};

const uploadProduct = async (req, res) => {
  try{

    const { name, description, countInStock, price, isDonation = false, } = req.fields;
    
    const { userId } = req.session;

    const { file } = req.files;
    
    await cloudinary.uploader.upload(
      file.path,
      {folder: 'leaf-life'},
      async (err, result)=>{

        if(!err){
          
          let newProduct;
          let boolIsDonation = isDonation === 'true' ? true : false;
          
          if(boolIsDonation ){
              newProduct = new Product({
              name: name,
              description: description,
              countInStock: countInStock,
              imageUrl: result.secure_url,
              imageId: result.public_id,
              sellerOrDonorId: userId,
              isDonation: isDonation,
              price: 0,
            });
          }else{
             newProduct = new Product({
              name: name,
              description: description,
              countInStock: countInStock,
              imageUrl: result.secure_url,
              imageId: result.public_id,
              sellerOrDonorId: userId,
              isDonation: isDonation,
              price: price,
            });
          }
          
          const savedProduct = await newProduct.save();
          return res.status(201).json({
            message:"Product added successfully",
            name: savedProduct.name,
            description: savedProduct.description,
            price: savedProduct.price,
            countInStock: savedProduct.countInStock,
            imageUrl: savedProduct.secure_url,
            imageId: savedProduct.public_id,
            sellerOrDonorId: savedProduct.userId,
            isDonation: savedProduct.isDonation,
          })
        }else{
          return res.status(503).json({
            message: "Error uploading image"
          })
        }
    });
  }catch(e){
    return res.status(500).json({
      message:  "Error uploading product details"
    })
  }
}

const updateProduct = async (req, res) => {
  try{
    const { productId = '' } = req.params;
    const { name = '', description = '', countInStock = '', price = '', sellerOrDonorId='' } = req.fields;
    const { file = {} } = req.files || {};
    
    let product = await Product.findById(productId);

    if(product.imageId){
      await cloudinary.uploader.destroy(product.imageId);
    }

    if(file.path){
      await cloudinary.uploader.upload(
        file.path,
        async (err, result)=>{
  
          if(!err){
            const updatedProduct = {
              name: name || product.name,
              description: description || product.description,
              countInStock: countInStock || product.countInStock,
              price: price || product.price,
              imageUrl: result.secure_url || user.profile_img,
              imageId: result.public_id || user.cloudinary_id,
            };
            
            product = await Product.findByIdAndUpdate(productId, updatedProduct, {new: true});
  
            return res.status(201).json({
              message:"Product added successfully",
              name: product.name,
              description: product.description,
              countInStock: product.countInStock,
              price: product.price,
              imageId: product.imageId || uuidv4(),
              imageUrl: product.imageUrl,
            });
          }else{
            return res.status(503).json({
              message: "Error uploading image"
            })
          }
      });
    }else{
      const updatedProduct = {
        name: name || product.name,
        description: description || product.description,
        countInStock: countInStock || product.countInStock,
        price: price || product.price,
      };

      product = await Product.findByIdAndUpdate(productId, updatedProduct, {new: true});
      
      return res.status(201).json({
        message:"Product added successfully",
        name: product.name,
        description: product.description,
        countInStock: product.countInStock,
        price: product.price,
        imageId: product.imageId || uuidv4(),
        imageUrl: product.imageUrl || '',
      });
    }
  }catch(e){
    return res.status(500).json({
      message: "Error updating product"
    })
  }
}

const deleteProduct = async (req, res) => {
  try{
    const { productId = '' } = req.params;
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({
        message: "The product does not exist or already deleted"
      });
    }

    await cloudinary.uploader.destroy(product.imageId);
    await product.remove();
    return res.status(202).json({
      message: "Product deleted successfully"
    });
  }catch(e){
    return res.status(500).json({
      message: "Error deleting product details"
    });
  }
}


module.exports = {
  getProducts,
  getProductById,
  uploadProduct,
  deleteProduct,
  updateProduct,
};
