import express from 'express'
import dotenv from 'dotenv';


dotenv.config();

import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/userRoute.js';
import { globalErrHandler ,notFound } from '../middlewears/globalErrHandler.js';
import productRouter from '../routes/productRoute.js';
import categoryRoute from '../routes/categoryRoute.js';
import brandRoute from '../routes/brandRoute.js';
import colorRoute from '../routes/colorRoute.js';
import reviewRoute from '../routes/reviewRoute.js';
import orderRoute from '../routes/orderRoute.js';
dbConnect();
const app = express()

//ye urls e data lene ke liye kara h 
app.use(express.json());

app.use('/api/v1/users/',userRoutes)
app.use('/api/v1/products/',productRouter);
app.use('/api/v1/categories/',categoryRoute);
app.use('/api/v1/brands/',brandRoute);
app.use("/api/v1/colors/",colorRoute)
app.use("/api/v1/reviews",reviewRoute)
app.use("/api/v1/orders",orderRoute)

//err middlewear
//ye notfound middlewear vo h tab bnda glt url pass karde then isse se passs karke error
//geenerate karenge then uss error ko globalerrhandler m bhej denge 
app.use(notFound);
app.use(globalErrHandler);


export default app;