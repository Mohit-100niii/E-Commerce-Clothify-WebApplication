import express from "express";
import expressAsyncHandler from "express-async-handler";
import Color from "../model/Color.js";

//create color
export const crateColorCtrl = expressAsyncHandler(async (req, res) => {
  let { name } = req.body;
  name = name.toLowerCase();
  const colorFound = await Color.findOne({ name });

  if (colorFound) {
    throw new Error("Color Already Exists");
  }

  //create
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Color Created Sucessfully",
    color,
  });
});

//getallcolors
export const getAllColorCtrl = expressAsyncHandler(async (req, res) => {
  let colorquery = await Color.find();

  const color = await colorquery;

  res.json({
    status: "success",
    message: "Colors Fetch Successfully",
    color,
  });
});

//get singlecolor
export const getSingleColorCtrl = expressAsyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  res.json({
    status: "success",
    message: "Color Fetch Successfully",
    color,
  });
});


//update color
export const updateColorCtrl = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
  
    const color = await Color.findByIdAndUpdate(
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
      message: "Color Update Sucessfully",
      color,
    });
  });


//delete color
export const deleteColorCtrl=expressAsyncHandler(async(req,res)=>{

    await Color.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message:"Color Deleteted Sucessfully",
     })
})