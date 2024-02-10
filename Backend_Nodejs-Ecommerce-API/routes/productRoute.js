import express from "express"
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from "../controller/ProductCtrl.js"
import { isLoggedIn } from "../middlewears/isLoggedIn.js";

const productRouter=express.Router();


productRouter.post("/",isLoggedIn, createProductCtrl);
productRouter.get("/", getProductsCtrl);
productRouter.get("/:id",getProductCtrl);
productRouter.put("/:id",isLoggedIn,updateProductCtrl);
productRouter.delete("/:id",isLoggedIn,deleteProductCtrl);




export default productRouter;