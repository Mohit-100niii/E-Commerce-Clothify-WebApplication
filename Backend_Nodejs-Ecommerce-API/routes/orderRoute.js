import express from 'express'
import { isLoggedIn } from '../middlewears/isLoggedIn.js';
import { createOrderCtrl } from '../controller/orderCtrl.js';

const orderRouter=express.Router();

orderRouter.post("/",isLoggedIn,createOrderCtrl);


export default orderRouter;