const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");
const Discussion = require("../models/Discussion");

verifyToken = (req, res, next) => {
  let token = req.session.token;
  if (!token) {
    return res.status(403).send({
      message: "Can not authenticate user! Token is required",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized user",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isSellerOrDonor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user.isSellerOrDonor) {
      return next();
    }

    return res.status(403).send({
      message: "You are not authorized to perform this operation",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate user",
    });
  }
};

isSellerOrDonorAuthorized = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }
    const { productId = "" } = req.params;
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "The product doesn't exist or is already deleted",
      });
    }

    if (product.sellerOrDonorId === user.id) {
      return next();
    }
    return res.status(403).json({
      message: "Seller not authorized to perform this operation",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unable to validate user",
    });
  }
};

isAuthor = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    const { discussionId = "" } = req.params;
    let discussion = await Discussion.findById(discussionId);

    if (!discussion) {
      return res.status(404).json({
        message: "The article does not exist",
      });
    }
    
    if (discussion.user == user.id) {
      return next();
    }
    return res.status(403).json({
      message: "You are not auhtorized to perform this operation",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unable to validate user",
    });
  }
};
isCommenter = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    const { discussionId = "" } = req.params;
    let discussion = await Discussion.findById(discussionId);

    if (!discussion) {
      return res.status(404).json({
        message: "The article does not exist",
      });
    }
    const comment = discussion && discussion.comments && discussion.comments.find((comment)=> comment.user == user.id)
    if (comment) {
      return next();
    }
    return res.status(403).json({
      message: "You are not auhtorized to perform this operation",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unable to validate user",
    });
  }
}
const authJwt = {
  verifyToken,
  isSellerOrDonor,
  isSellerOrDonorAuthorized,
  isAuthor,
  isCommenter,
};
module.exports = authJwt;
