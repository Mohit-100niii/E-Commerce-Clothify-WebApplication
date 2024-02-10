import express from "express";
import { isLoggedIn } from "../middlewears/isLoggedIn.js";
import {
  crateColorCtrl,
  deleteColorCtrl,
  getAllColorCtrl,
  getSingleColorCtrl,
  updateColorCtrl,
} from "../controller/colorsCtrl.js";

const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, crateColorCtrl);
colorRouter.get("/", getAllColorCtrl);
colorRouter.get("/:id", getSingleColorCtrl);
colorRouter.put("/:id", isLoggedIn, updateColorCtrl);
colorRouter.delete("/:id", isLoggedIn, deleteColorCtrl);

export default colorRouter;
