const validator = require("validator");

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const validateLoginInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.email = "Enter a valid email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

export const validateRegisterInput = (data) => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

export const validateProductUploadInput = (formData) => {
  let errors = {};
  let data = {};
  data.name = !isEmpty(formData.get("name")) ? formData.get("name") : "";

  data.countInStock = !isEmpty(formData.get("countInStock"))
    ? parseFloat(String(formData.get("countInStock")))
    : 0;
  data.description = !isEmpty(formData.get("description"))
    ? formData.get("description")
    : "";
  data.price = !isEmpty(formData.get("price"))
    ? parseFloat(String(formData.get("price")))
    : 0;
  data.isDonation = !isEmpty(formData.get("isDonation"))
    ? formData.get("isDonation")
    : "";

  if (!validator.isLength(data.name, { min: 10, max: 100 })) {
    errors.name = "Product name must have atleast 10 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Product name is required";
  }

  if (!validator.isLength(data.description, { min: 20, max: 25000 })) {
    errors.description = "Description must have atleast 20 character";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Product description is required";
  }

  if (data.countInStock <= 0) {
    errors.countInStock = "Count should be greater than 0";
  }
  if (isNaN(data.price)) {
    errors.price = "Price should have numeric value";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

export const validateDiscussionPostInput = (data) => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.title, { min: 15, max: 100 })) {
    errors.title = "Title must have atleast 15 characters";
  }

  if (validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (!validator.isLength(data.text, { min: 25, max: 25000 })) {
    errors.text = "Article must have atleast 25 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Article is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};

export const validateCommentInput = (data) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";


  if (validator.isEmpty(data.text)) {
    errors.comment = "Cannot post empty value";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
