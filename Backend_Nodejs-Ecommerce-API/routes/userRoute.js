import express from "express";
import {
  loginUserCtrl,
  registerUserCtrl,
  getUserProfileCtrl,
  updateShippingAdressCtrl,
} from "../controller/usersCtrl.js";
import { isLoggedIn } from "../middlewears/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);

userRoutes.post("/login", loginUserCtrl);

userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);
userRoutes.post("/update/shipping", isLoggedIn, updateShippingAdressCtrl);

export default userRoutes;
