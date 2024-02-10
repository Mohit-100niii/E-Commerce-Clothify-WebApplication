import Brand from "../model/Brand.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import expressAsyncHandler from "express-async-handler";

export const createProductCtrl = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    brand,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  //find the category
  const categoryFound = await Category.findOne({
    name: category,
  });

  // console.log(categoryFound);
  if (!categoryFound) {
    throw new Error("Category Not Found or Please Check Category Name");
  }

  //find the brand in the database
  const brandFound = await Brand.findOne({
    name: brand?.toLowerCase(),
  });

  if (!brandFound) {
    throw new Error("Brand Not Found or Please Check Brand Name");
  }

  //prodctexits
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product already Exists");
  }
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });

  //push the product into category
  categoryFound.products.push(product._id);
  //resave
  await categoryFound.save();

  //push the product intot brand
  //ye hmne all products related to that brnad m store karliye 
  //products.push ye products brand m hmne products array bnayi h vo h 
  brandFound.products.push(product._id);
  //resave
  await brandFound.save();

  res.json({
    status: "Success",
    message: "Product created successfully",
    product,
  });
});

export const getProductsCtrl = expressAsyncHandler(async (req, res) => {
  //query

  let productQuery = Product.find();

  //search by name
  //jop hme url m search karne keliye milla uske according mongodb m search karlia
  if (req.query.name) {
    productQuery = productQuery.find({
      // regrex option ye lowercase m karne ke liye h
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  //search by brand
  //jop hme url m search karne k eliye milla uske according mongosb m search karlia
  if (req.query.brand) {
    productQuery = productQuery.find({
      // regrex option ye lowercase m karne ke liye h
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  //search by colors
  //jop hme url m search karne k eliye milla uske according mongosb m search karlia
  if (req.query.colors) {
    productQuery = productQuery.find({
      // regrex option ye lowercase m karne ke liye h
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }

  //search by colors
  //jop hme url m search karne k eliye milla uske according mongosb m search karlia
  if (req.query.category) {
    productQuery = productQuery.find({
      // regrex option ye lowercase m karne ke liye h
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //search by size
  //jop hme url m search karne k eliye milla uske according mongosb m search karlia
  if (req.query.sizes) {
    productQuery = productQuery.find({
      // regrex option ye lowercase m karne ke liye h
      sizes: { $regex: req.query.sizes, $options: "i" },
      //jo ye $option:"i" likha h na ye camerlcasing ignore karne ke liye likha h
    });
  }

  //filter by price range
  if (req.query.price) {
    //?price=100-400 we have to split first
    const priceRange = req.query.price.split("-");

    //get : greater or equal
    //lte:  less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIdx
  const startindex = (page - 1) * limit;
  //endindx
  const endindex = page * limit;
  //totalproduct
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startindex).limit(limit);

  //pagination result
  const pagination = {};

  if (endindex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startindex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //   console.log(productQuery);
  const products = await productQuery.populate('reviews');

  res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    message: "Product fetched successfully",
    products,
  });
});

//get single product

export const getProductCtrl = expressAsyncHandler(async (req, res) => {
  //{{baseURL}}/products/656cdb7df52b28e6efcc2aa3
  //aisa url h isliye use.params use karna pdhaa
  //ye populate isliye kara h taaki product ke review section m user ki saari details
  //a  jaye usne kya review wagreh kara h 
  const product = await Product.findById(req.params.id).populate('reviews');
  if (!product) {
    throw new Error("Product Not Found");
  }

  res.json({
    status: "success",
    message: "Product Fetch Sucessfully",
    product,
  });
});

//update product
export const updateProductCtrl = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    brand,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  //update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      brand,
      colors,
      user,
      price,
      totalQty,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Product Update Sucessfully",
    product,
  });
});

//deleteProduct
export const deleteProductCtrl = expressAsyncHandler(async (req, res) => {
  //delete
  const product = await Product.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Product Delete Sucessfully",
  });
});
