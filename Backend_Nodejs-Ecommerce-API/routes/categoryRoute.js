import express from "express";
import { isLoggedIn } from "../middlewears/isLoggedIn.js";
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from "../controller/categoriesCtrl.js";

const categoryRoute=express.Router();

categoryRoute.post("/",isLoggedIn,createCategoryCtrl)
categoryRoute.get("/",getAllCategoryCtrl)
categoryRoute.get("/:id",getSingleCategoryCtrl);
categoryRoute.put("/:id",isLoggedIn,updateCategoryCtrl);
categoryRoute.delete("/:id",isLoggedIn,deleteCategoryCtrl);

export default categoryRoute;