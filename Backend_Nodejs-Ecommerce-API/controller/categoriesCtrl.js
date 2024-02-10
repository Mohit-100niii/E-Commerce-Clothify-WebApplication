import expressAsyncHandler from "express-async-handler";
import Category from "../model/Category.js";

export const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  //if category exits
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error("Categoty Already Exists");
  }

  const category = await Category.create({
    name:name?.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Categoty Created Sucessfully",
    category,
  });
});

//get all categories
export const getAllCategoryCtrl = expressAsyncHandler(async (req, res) => {
  let categoryquery = await Category.find();

  const categories = await categoryquery;

  res.json({
    status: "success",
    message: "Categories Fetch Successfully",
    categories,
  });
});

//get single category
export const getSingleCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.json({
    status: "success",
    message: "Category Fetch Successfully",
    category,
  });
});

//updatecategory
export const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Category Update Sucessfully",
    category,
  });
});

//delete category
export const deleteCategoryCtrl=expressAsyncHandler(async(req,res)=>{
   
    //delete
    const category= await Category.findByIdAndDelete(req.params.id);


  res.json({
      status: "success",
      message:"Category Deleteted Sucessfully",
   })
});
