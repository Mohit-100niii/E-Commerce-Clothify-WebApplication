import express from "express";
import expressAsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//create brands
export const crateBrandCtrl = expressAsyncHandler(async (req, res) => {
    let { name } = req.body;
    name=name.toLowerCase();

  const brandFound = await Brand.findOne({ name });

  if (brandFound) {
    throw new Error("Brand Already Exists");
  }

  //create
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Brand Created Sucessfully",
    brand,
  });
});

//get all brands
export const getAllBrandCtrl = expressAsyncHandler(async (req, res) => {
  let brandquery = await Brand.find();

  const brand = await brandquery;

  res.json({
    status: "success",
    message: "Brand Fetch Successfully",
    brand,
  });
});

//get singlebrand
export const getSingleBrandCtrl = expressAsyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.json({
    status: "success",
    message: "Brand Fetch Successfully",
    brand,
  });
});

//update brand
export const updateBrandCtrl = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
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
    message: "Brand Update Sucessfully",
    brand,
  });
});


//delete brand
export const deleteBrandCtrl=expressAsyncHandler(async(req,res)=>{

    await Brand.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message:"Brand Deleteted Sucessfully",
     })
})