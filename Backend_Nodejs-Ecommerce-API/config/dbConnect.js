import mongoose from "mongoose";


const dbConnect =async()=>{
    try {
        const connected = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected ${( connected).connection.host}`);
    } catch (error) 
    {
        console.log(error);
        console.log("Connection Failed");
        process.exit(1);
    }
};




export default dbConnect;