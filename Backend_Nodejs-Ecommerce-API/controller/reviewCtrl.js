import express from "express";
import expressAsyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

//create Review
export const createReviewCtrl = expressAsyncHandler(async (req, res) => {
  const { product, message, rating } = req.body;
  const { productID } = req.params;
  const productFound = await Product.findById(productID).populate("reviews");

  if (!productFound) {
    throw new Error("Product Not Exists");
  }

  //check if user already response to this product
  const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user?.toString() === req?.userAuthId?.toString();
  });

  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
  }
  //create review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });

  //push review into productfound
  //ye reviews productschema m jo bnaya h usme push kara h
  productFound.reviews.push(review?._id);
  //resave
  await productFound.save();

  res.json({
    status: "success",
    msg: "Review created Successfully",
  });
});
