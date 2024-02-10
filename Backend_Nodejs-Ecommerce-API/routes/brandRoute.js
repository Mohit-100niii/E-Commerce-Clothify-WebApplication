import express from "express";
const brandRouter = express.Router();

import { crateBrandCtrl, deleteBrandCtrl, getAllBrandCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controller/brandCtrl.js";
import { isLoggedIn } from "../middlewears/isLoggedIn.js";

brandRouter.post("/", isLoggedIn, crateBrandCtrl);
brandRouter.get("/",getAllBrandCtrl);
brandRouter.get("/:id",getSingleBrandCtrl);
brandRouter.put("/:id",isLoggedIn,updateBrandCtrl);
brandRouter.delete("/:id",isLoggedIn,deleteBrandCtrl);


export default brandRouter;