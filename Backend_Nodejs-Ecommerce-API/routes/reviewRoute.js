import express from "express";
import { createReviewCtrl } from "../controller/reviewCtrl.js";
import { isLoggedIn } from "../middlewears/isLoggedIn.js";
const reviewRouter=express.Router();


reviewRouter.post("/:productID",isLoggedIn, createReviewCtrl);




export default reviewRouter;